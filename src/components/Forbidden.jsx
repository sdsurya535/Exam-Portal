/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";


const Forbidden = () => {
  return (
    <>
      <div className="text-center mt-32 mb-[20.58rem]">

      <div className=" mb-11">
        <img className="me-auto ms-auto h-40" src="/images/errors.png" alt="noimage" />
      </div>

        <div className="text-6xl font-bold text-red-600" data-content="404">
          403 - ACCESS DENIED
        </div>

        <div className="mt-8 text-4xl font-bold text-sky-600">
          Oops, You don't have permission to access this page.
        </div>
        <div className="mt-8 text-2xl font-bold text-rose-600">
        You are trying to access the wrong page please return to home page
        </div>

        <div className="mt-16">
          <Link to={"/"} className=" bg-transparent text-lg font-bold text-red-500 no-underline rounded-full border-2 px-3 py-3 border-red-600" href="https://www.brodroid.com">
            Go to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default Forbidden;
