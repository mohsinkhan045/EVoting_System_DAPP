import React from "react";
import img from "./bg.png";
import imgs from "./b3c2a436-0364-4c31-bf59-68d1cfb49958.png";
import vimg from "../Votes/voterimg.png";
import cimg from "../Candidates/candidateimg.png";
import { TypeAnimation } from "react-type-animation";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const HeroSection = () => {
  return (
    <>
      <section class="text-white bg-green-400 body-font">
        <img
          className="z-20 absolute left-96 w-6 animate-ping"
          src={imgs}
          alt=""
        />
        <img
          className="z-20 absolute right-52 w-6 animate-ping"
          src={imgs}
          alt=""
        />
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-extrabold text-green-700">
              Decentralized Voting System
            </h1>
            <TypeAnimation
              sequence={[
                "If you want to vote, click on the vote button.",
                1500,
                "If you want to become a candidate, click on the Candidate button.",
                1500,
              ]}
              className="title-font sm:text-4xl text-3xl mb-4 font-medium text-red-500"
              wrapper="span"
              speed={10}
              repeat={Infinity}
            />
            <p class="mb-8 leading-relaxed">
              Empower your community with our secure and transparent voting
              system, ensuring fair and democratic decision-making. Vote with
              confidence using our cutting-edge voting platform, making your
              voice heard in a simple and user-friendly way.
            </p>
            <div class="flex justify-center">
              <button class=" hover:scale-110 duration-700 inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                <NavLink to="/candidates">
                  <div className="flex items-center">
                    <img src={cimg} className="w-11 h-11" />
                    Candidate
                  </div>
                </NavLink>
              </button>
              <button class=" hover:scale-110 duration-700 ml-4 inline-flex text-white bg-red-400 border-0 py-2 px-6 focus:outline-none hover:bg-red-500 rounded text-lg">
                <NavLink to="/votes">
                  <div className="flex items-center">
                    <img src={vimg} className="w-11 h-11" />
                    Vote
                  </div>
                </NavLink>
              </button>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded animate-trans-up hover:animate-pulse"
              alt="hero"
              src={img}
            />
            <img
              className="z-20 absolute  w-6 animate-ping"
              src={imgs}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
