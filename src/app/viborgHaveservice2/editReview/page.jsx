"use client";

import React, { useEffect, useState } from "react";
import useRequestData from "../../../hooks/useRequestData";
import Loader from "../../../components/Loader";
import Error from "@/components/Error";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import AddPopUp from "@/components/AddPopUp";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";

const page = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const {
    data: dataDel,
    isLoading: isLoadingDel,
    error: errorDel,
    makeRequest: makeRequestDel,
  } = useRequestData();

  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    makeRequest("http://localhost:5023/reviews", "GET", null);
  }, [dataDel, popUp]);

  const handleDelete = (ID, author) => {
    if (window.confirm("Er du sikker på at du vil slette: " + author)) {
      makeRequestDel(
        "http://localhost:5023/reviews/admin/" + ID,
        "DELETE",
        null
      );
    }
  };

  return (
    <section className="my-10">
      {isLoading || (isLoadingDel && <Loader />)}
      {error || (errorDel && <Error />)}
      {data && (
        <div className="">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center border-b border-green-400"
            >
              <div className="col-span-2">
                <p className="my-10">{item.content}</p>
                <p>{item.author}</p>
              </div>
              <div className="flex justify-center gap-5">
                <div className="cursor-pointer group relative overflow-hidden">
                  <FaRegEdit
                    size={20}
                    className="absolute top-0 group-hover:-top-5 transition-all"
                  />
                  <p className="absolute top-5 group-hover:top-0 transition-all">
                    Rette
                  </p>
                  <p className="opacity-0" onClick={() => setPopUp(item)}>
                    Rette
                  </p>
                </div>
                <div className="cursor-pointer group relative overflow-hidden">
                  <FaRegTrashAlt
                    size={20}
                    className="absolute top-0 group-hover:-top-5 transition-all"
                  />
                  <p className="absolute top-5 group-hover:top-0 transition-all">
                    Slette
                  </p>
                  <p
                    onClick={() => handleDelete(item._id, item.author)}
                    className="opacity-0"
                  >
                    Slette
                  </p>
                </div>
              </div>
              {popUp && <AddPopUp setPopUp={setPopUp} popUp={popUp} />}
            </div>
          ))}
          <Link
            href="/viborgHaveservice2"
            className="flex items-center text-green-400 hover:text-green-600"
          >
            <FaAngleLeft />
            Tilbage
          </Link>
        </div>
      )}
    </section>
  );
};

export default page;
