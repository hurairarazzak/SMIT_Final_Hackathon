import React from "react";

const NewsLetter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="p-4 text-center">
      <p className="text-2xl font-semibold font-medium text-gray-800">
        Subscribe Now & Get Latest Updates
      </p>
      <p className="text-gray-400 mt-3">
        Subscribe for getting latest news and updates about our services and offers.
      </p>
      <form
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          onClick={onSubmitHandler}
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
