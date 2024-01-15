"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import useRequestData from "@/hooks/useRequestData";
import { FaRegWindowClose } from "react-icons/fa";

const AddPopUp = ({ setPopUp, popUp }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const { makeRequest } = useRequestData();

  useEffect(() => {
    setAuthor(popUp.author);
    setContent(popUp.content);
  }, []);

  const handleSubmitSettings = (e) => {
    e.preventDefault();

    const editItem = {
      author: author,
      content: content,
    };

    makeRequest(
      "http://localhost:5023/reviews/admin/" + popUp._id,
      "PUT",
      editItem
    );

    setPopUp(false);
  };

  return (
    <div className="fixed top-10 left-1/3 bg-white border-double border-4 border-green-400 shadow-lg">
      <h2 className="text-center text-2xl">Admin - Rette</h2>
      <FaRegWindowClose size={20} onClick={() => setPopUp(false)} className="absolute top-0 right-0 fill-green-400 hover:fill-green-600 cursor-pointer"/>
      <form
        action=""
        onSubmit={(e) => handleSubmitSettings(e)}
        className="flex flex-col p-10"
      >
        <label htmlFor="">
          <h2 className="text-green-400 text-xl">Titel: </h2>
        </label>
        <input
          type="text"
          name=""
          value={author}
          onInput={(e) => setAuthor(e.target.value)}
          className="border-b border-gray-300 my-2 py-1"
        />
        <label htmlFor="content" className="">
          <h2 className="text-green-400 text-xl">Indhold: </h2>
        </label>
        <textarea
          type="text"
          name=""
          value={content}
          onInput={(e) => setContent(e.target.value)}
          rows="10"
          className="border border-gray-300 my-2 py-1"
        />
        <button type="submit" className="btn mx-auto">
          Ret
        </button>
      </form>
    </div>
  );
};

export default AddPopUp;
