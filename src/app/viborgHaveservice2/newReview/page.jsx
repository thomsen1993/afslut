"use client";

import React from "react";
import { useState, useEffect } from "react";
import useRequestData from "../../../hooks/useRequestData";
import Link from "next/link";
import { FaAngleLeft, FaCheck } from "react-icons/fa";

const page = () => {
  const { makeRequest } = useRequestData();

  const handleNewSubmit = (e) => {
    e.preventDefault();
    const newPost = new FormData(e.target);
    makeRequest("http://localhost:5023/reviews/admin/", "POST", newPost);
    setDone(true);
  };

  const [done, setDone] = useState(false);

  return (
    <section className="my-10">
      <h1 className="mb-10 text-center">Admin - ny Review</h1>
      <form
        action=""
        onSubmit={handleNewSubmit}
        className="flex flex-col mx-auto w-1/2 p-10 border shadow-lg"
      >
        <label htmlFor="" className="">
          <h2 className="text-green-400 text-xl">Forfatter: </h2>
        </label>
        <input
          type="text"
          name="author"
          placeholder="Forfatter..."
          required
          className="border-b border-gray-300 my-2 py-1"
        />
        <label htmlFor="content" className="">
          <h2 className="text-green-400 text-xl">Indhold: </h2>
        </label>
        <textarea
          type="text"
          name="content"
          placeholder="Indhold..."
          rows="10"
          required
          className="border border-gray-300 my-2 py-1"
        />
        <div className="flex items-center justify-around">
            <Link
              href="/viborgHaveservice2"
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
              <p className="pl-2">Done! - fast and easy 😉</p>
            </div>
          )}
      </form>
    </section>
  );
};

export default page;
