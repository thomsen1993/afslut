"use client";

import { useState, useEffect } from "react";
import useRequestData from "../../../hooks/useRequestData";
import Loader from "../../../components/Loader";
import Error from "@/components/Error";
import Link from "next/link";
import { FaAngleLeft, FaCheck } from "react-icons/fa";

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5023/aboutus/admin", "PUT", null);
  }, []);

  useEffect(() => {
    if (data) {
      setTitle(data.about.title || "");
      setContent(data.about.content || "");
    }
  }, [data]);

  const handleSubmitSettings = (e) => {
    e.preventDefault();
    const edit = {
      title: title,
      content: content,
    };
    makeRequest("http://localhost:5023/aboutus/admin", "PUT", edit);
    setDone(true);
  };

  const [done, setDone] = useState(false);

  return (
    <div className="my-10 relative">
      <h1 className="mb-10 text-center">Admin indstillinger</h1>
      {isLoading && <Loader />}
      {error && <Error />}
      {data && (
        <form
          action=""
          onSubmit={(e) => handleSubmitSettings(e)}
          className="flex flex-col mx-auto w-1/2 p-10 border shadow-lg"
        >
          <label htmlFor="title" className="">
            <h2 className="text-green-400 text-xl">Titel: </h2>
          </label>
          <input
            type="text"
            id="title"
            name=""
            value={title}
            onInput={(e) => setTitle(e.target.value)}
            className="border-b border-gray-300 my-2 py-1"
          />
          <label htmlFor="content" className="">
            <h2 className="text-green-400 text-xl">Indhold: </h2>
          </label>
          <textarea
            type="text"
            id="content"
            name=""
            value={content}
            onInput={(e) => setContent(e.target.value)}
            rows="10"
            className="border border-gray-300 my-2 py-1"
          />
          <div className="flex items-center justify-around">
            <Link
              href="/viborgHaveservice1"
              className="flex items-center text-green-400 hover:text-green-600"
            >
              <FaAngleLeft />
              Tilbage
            </Link>
            <button type="submit" className="btn">
              Ret
            </button>
          </div>
          {done && (
            <div className="flex items-center mx-auto">
              <FaCheck />
              <p className="pl-2">{data.message}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default page;
