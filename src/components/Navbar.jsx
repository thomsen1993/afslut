"use client";

import { useState } from "react";
import Link from "next/link";
import { FaSoundcloud, FaNewspaper } from "react-icons/fa";
import { MdWindPower } from "react-icons/md";

const Navbar = () => {
  const [down, setDown] = useState(false);

  return (
    <nav className="flex justify-between border-b border-green-400 shadow-lg p-5">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <ul className="flex gap-4">
        <li
          className="border-r border-green-400 pr-4 group"
          onMouseEnter={() => setDown(true)}
          onMouseLeave={() => setDown(false)}
        >
          <Link href="" className="">
            <p className="group-hover:opacity-0 transition-all group-hover:-translate-y-2">
              Viborg Have Service
            </p>
          </Link>
          {down && (
            <ul className="absolute top-5 transition-all animate-[show_.3s_ease-in-out] border border-green-400 bg-white px-5 py-2 shadow-md z-10">
              <li className="hover:underline">
                <Link href="/viborgHaveservice1">
                  Viborg Have Service <span className="text-green-400">1</span>
                </Link>
              </li>
              <li className="hover:underline">
                <Link href="/viborgHaveservice2">
                  Viborg Have Service <span className="text-green-400">2</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="border-r border-green-400 pr-4 relative overflow-hidden group">
          <p className="opacity-0">Vejret</p>
          <Link
            href="/vejretmap"
            className="absolute top-0 transition-all group-hover:-top-6 group-hover:opacity-0 z-0"
          >
            Vejret
          </Link>
          <Link
            href="/vejretmap"
            className="absolute top-5 transition-all opacity-0 group-hover:top-0 group-hover:opacity-100 translate-x-1/4"
          >
            <FaSoundcloud size={30} />
          </Link>
        </li>
        <li className="border-r border-green-400 pr-4 relative overflow-hidden group">
          <p className="opacity-0">Nyheder</p>
          <Link
            href=""
            className="absolute top-0 transition-all group-hover:-top-6 group-hover:opacity-0 z-0"
          >
            Nyheder
          </Link>
          <Link
            href="/nyheder"
            className="absolute top-5 transition-all opacity-0 group-hover:top-0 group-hover:opacity-100 translate-x-2/3"
          >
            <FaNewspaper size={27} />
          </Link>
        </li>
        <li className=" pr-4 relative overflow-hidden group">
          <p className="opacity-0">Energidata</p>
          <Link
            href=""
            className="absolute top-0 transition-all group-hover:-top-6 group-hover:opacity-0 z-0"
          >
            Energidata
          </Link>
          <Link
            href=""
            className="absolute top-5 transition-all opacity-0 group-hover:top-0 group-hover:opacity-100 translate-x-2/3"
          >
            <MdWindPower size={27} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
