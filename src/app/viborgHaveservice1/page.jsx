"use client";

import { useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "@/components/Error";
import Link from "next/link";

const page = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data: dataServices, makeRequest: makeRequestServices } =
    useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5023/aboutus", "GET", null);
  }, []);

  useEffect(() => {
    makeRequestServices("http://localhost:5023/services", "GET", null);
  }, []);

  return (
    <section className="my-10">
      {isLoading && <Loader />}
      {error && <Error />}
      {data && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="mb-5">
              Velkommen til {" "}
              <span className="text-green-500">
                 Viborg <br /> Haveservice
              </span>
              <div className="w-20 border-b-2 border-green-500 mt-4"></div>
            </h1>
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </div>
          <div>
            {dataServices && (
              <div className="grid grid-cols-2 gap-6">
                <figure>
                  <img
                    src={
                      "http://localhost:5023/images/" + dataServices[1].image
                    }
                    alt=""
                    className=""
                  />
                  <figcaption>
                    <p className="my-2"><strong>{dataServices[1].title}</strong></p>
                    <p>{dataServices[1].content}</p>
                  </figcaption>
                </figure>
                <figure>
                  <img
                    src={
                      "http://localhost:5023/images/" + dataServices[0].image
                    }
                    alt=""/* {"http://localhost:5023/services/" + dataServices[0].image} */
                    className=""
                  />
                  <figcaption>
                    <p className="my-2"><strong>{dataServices[0].title}</strong></p>
                    <p>{dataServices[0].content}</p>
                  </figcaption>
                </figure>
              </div>
            )}
          </div>
          <Link href="/viborgHaveservice1/serviceAdmin" className="btn">se alle vdelser</Link>
        </div>
      )}
    </section>
  );
};

export default page;
