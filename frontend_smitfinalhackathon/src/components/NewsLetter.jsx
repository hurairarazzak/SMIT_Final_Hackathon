import React from "react";
import { useInView } from "react-intersection-observer";
import "animate.css";

const NewsLetter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% visible
    triggerOnce: true, // Animation triggers only once
  });
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae.
      </p>
      <form
        ref={ref}
        className={`w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 ${
          inView ? "animate__animated animate__zoomInDown" : ""
        }`}
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
