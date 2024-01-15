"use client";

import { useEffect, useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { dk } from "date-fns/locale";
import langData from "./newsapi_requestparameters.json";
import sortByjson from "./sortBy.json";
import Link from "next/link";

const page = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [searchKey, setSearchKey] = useState("viborg");
  const [lang, setLang] = useState("en");
  const [sortBy, setSortBy] = useState("popularity");

  useEffect(() => {
    makeRequest(
      "https://newsapi.org/v2/everything?q=" +
        searchKey +
        "&pageSize=10&language=" +
        lang +
        "&sortBy=" +
        sortBy +
        "&apiKey=d86a521d9f244d3a85488cf3bcc5ebb4"
    );
  }, [lang, sortBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    makeRequest(
      "https://newsapi.org/v2/everything?q=" +
        searchKey +
        "&pageSize=9&language=" +
        lang +
        "&sortBy=" +
        sortBy +
        "&apiKey=d86a521d9f244d3a85488cf3bcc5ebb4"
    );
  };

  return (
    <section className="my-10">
      <h1>Nyheder - "Everything"</h1>

      {isLoading && <Loader />}

      <div className="flex justify-between my-5">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="search"
            name=""
            id="search"
            placeholder="Pesquisar..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="bg-slate-100 rounded-lg"
          />
        </form>
        <div className="flex gap-3">
          <form action="lang" className="">
            <label htmlFor="lang">Sprog: </label>
            <select
              name=""
              id="lang"
              onChange={(e) => setLang(e.target.value)}
              value={lang}
              className="bg-slate-100 rounded-tl-lg rounded-tr-lg"
            >
              {langData.language.map((event, index) => (
                <option key={index} value={event.code}>
                  {event.language}
                </option>
              ))}
            </select>
          </form>
          <form action="sort">
            <label htmlFor="sort">Sortere: </label>
            <select
              name=""
              id="sort"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              className="bg-slate-100 p-2 rounded-tl-lg rounded-tr-lg"
            >
              {sortByjson.sort.map((event, index) => (
                <option key={index} value={event.by}>
                  {event.by}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      {error && <Error />}
      <div className="grid grid-cols-3 gap-3 rounded-lg mb-10">
        {data &&
          data.articles.map((e) => (
            <div className=" bg-slate-100 rounded-lg hover:shadow-lg pb-10 relative">
              <div className="mx-auto">
                <img
                  src={e.urlToImage}
                  alt=""
                  className=" rounded-tl-lg rounded-tr-lg h-64 object-cover"
                />
              </div>
              <div className=" p-2">
                <h2 className=" text-3xl">{e.title}</h2>
                <p className=" text-sm text-gray-400">{e.author}</p>
              </div>

              <div className="mb-14">
                <div className="bg-slate-200 rounded-lg p-2">
                  <p>{e.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 w-full">
                <Link href={e.url} className="btn">
                  Læs mere
                </Link>
                <div className="italic text-right text-gray-400 bg-slate-600 rounded-lg p-2">
                  <p>
                    {new Date(e.publishedAt).toLocaleString("dk", {
                      year: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    {formatDistanceToNow(new Date(e.publishedAt), {
                      locale: dk,
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default page;
