
import Image from "next/image";
import benny from "../../public/benny.jpg"

export default function Home() {

  return (
    <section className="max-w-[900px] mx-auto my-10 border-4 border-double border-green-400 shadow-lg">
      <div className="m-10">
        <h1 className="text-center">Home page - Afslutning dataservice</h1>
        <figure className="my-10 grid grid-cols-2 justify-items-center items-center">
          <div className="border-x-4 border-green-600 p-1 rounded-full">
            <Image src={benny} width={300} className="rounded-full border-y-4 border-green-400 p-1"/>
          </div>
          <figcaption className="">
            <p>Benny Thomsen</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
