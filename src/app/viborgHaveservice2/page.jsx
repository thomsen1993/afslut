"use client";

import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "@/components/Error";
import Image from "next/image";
import background from "../../../public/udtalelser-bg.jpg";
import Link from "next/link";

const Page = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    makeRequest("http://localhost:5023/reviews", "GET", null);
  }, []);

  const handleRadioClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="grid grid-cols-2 mt-10 overflow-hidden">
      {isLoading && <Loader />}
      {error && <Error />}
      <div className="col-span-2 col-start-1 row-start-1">
        <Image src={background} alt="" className="" />
      </div>
      {data && (
        <div className="col-span-2 col-start-1 row-start-1 flex flex-col justify-center text-white bg-lime-500/80 ">
          <div className="text-center">
            <h1>Kundeudtalelser</h1>
            <div className="w-24 border-2 border-white mx-auto my-4"></div>
          </div>
          <div className="text-center text-white relative">
            {data.map((item, index) => (
              <div
                key={index}
                className="absolute w-full transition-all"
                style={{
                  left: `${(1200 * index)}px`,
                  transform: `translateX(${-1200 * currentIndex}px)`,
                }}
              >
                <p className="my-10">{item.content}</p>
                <p>{item.author}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-5">
            {data.map((_, index) => (
              <div
                key={index}
                className={`cursor-pointer w-5 h-5 rounded-full border border-white  z-50 ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => handleRadioClick(index)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-center col-span-2 gap-5 my-5">
        <Link href="/viborgHaveservice2/newReview" className="btn">Opret review</Link>
        <Link href="/viborgHaveservice2/editReview" className="btn">Redigere review</Link>
      </div>
    </section>
  );
};

export default Page;
