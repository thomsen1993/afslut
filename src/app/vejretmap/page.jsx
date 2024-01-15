"use client";

import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "@/components/Error";
import { FaSearch } from "react-icons/fa";
import weatherPic from "../../../public/01d.jpg";
import Image from "next/image";
/* import LeafLetMap from '../../components/LeafLetMap' */


const page = () => {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [lat, setLat] = useState("56");
  const [lon, setLon] = useState("15");

  useEffect(() => {
    makeRequest(
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=97c9af3be5f9f4a9d6167693a848da4a"
    );
  }, []);

  return (
    <section className="my-10">
      {isLoading && <Loader />}
      {error && <Error />}
      {/* <LeafLetMap coord={[lat, lon]} setLat={setLat} setLon={setLon}/> */}
      {data && (
        <div className="grid grid-cols-4 gap-5">
          {data.list.map((item, index) => (
            <div key={index} className="grid rounded-md overflow-hidden shadow-lg shadow-black">
              <div className="row-start-1 col-start-1 z-0 brightness-75">
                <Image
                  src={weatherPic}
                  alt=""
                  className="h-full object-cover"
                />
              </div>
              <div className=" row-start-1 col-start-1 z-10 p-4 text-white">
                <div className="text-xl text-center pb-2">
                  <h2 className="">Vejret for Århus</h2>
                  <h3 className="text-green-300">{item.dt_txt}</h3>
                </div>
                <ul>
                  <li className="border-b border-gray-400 pb-2 mb-1">
                    Temperature: {Math.round(item.main.temp)}&deg;C
                  </li>
                  <li className="border-b border-gray-400 pb-2 mb-1">
                    Temperature min: {Math.round(item.main.temp_min)}
                    &deg;C
                  </li>
                  <li className="border-b border-gray-400 pb-2 mb-1">
                    Temperature max: {Math.round(item.main.temp_max)}
                    &deg;C
                  </li>
                  <li className="border-b border-gray-400 pb-2 mb-1">
                    Feels like: {item.main.feels_like}
                  </li>
                  <div className="border-2 border-black rounded-md overflow-hidden relative">
                    <div
                      style={{ width: item.main.humidity + "%" }}
                      className=" bg-blue-400"
                    >
                      <li className="px-2"> Humidity: {item.main.humidity}%</li>
                    </div>
                  </div>
                  <li className=" w-max mt-2 mb-2 mx-auto ">
                    {item.weather[0].main}
                    <img
                      src={
                        "https://openweathermap.org/img/wn/" +
                        item.weather[0].icon +
                        ".png"
                      }
                      alt=""
                      className="border rounded-full"
                    />
                    {item.weather[0].description}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default page;
