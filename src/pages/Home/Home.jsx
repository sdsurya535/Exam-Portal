/* eslint-disable react/no-unescaped-entities */

import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="relative isolate z-0 bg-white px-6 pt-14 mb-3 lg:px-8">
        <div className="relative mx-auto max-w-2xl py-24">
          <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-green-700 sm:text-6xl">
              Welcome To The Exam Portal Created By Suryadutta Dash
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Welcome to our exam portal website! Here, you can access a wide
              range of study materials, practice tests, and resources to help
              you prepare for your exams. Our user-friendly platform is designed
              to make studying efficient and effective. Whether you're a student
              looking to ace your exams or a professional seeking to enhance
              your skills, we've got you covered. Explore our website and take
              your first step towards exam success!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-2">
              <NavLink
                to={"/signup"}
                className="rounded-md no-underline bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get Started
              </NavLink>
              <NavLink
                to={"/login"}
                className="rounded-md no-underline border border-green-700 px-3 py-2 text-sm font-semibold text-green-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
