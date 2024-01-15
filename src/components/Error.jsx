import React from "react";
import Image from "next/image";
import sad from "../../public/sadface.jpg";

const Error = () => {
  return (
    <div className="absolute top-0 left-0 bg-black/50 w-full h-full">
      <div className="bg-white w-max mx-auto mt-20 p-10 rounded-md border border-green-400">
        <h2>Something went wrong...</h2>
        <Image src={sad} alt="sad face" width={100} className="mx-auto"/>
      </div>
    </div>
  );
};

export default Error;
