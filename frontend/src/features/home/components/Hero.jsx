import React from "react";

export default function Hero() {
  return (
    <section className="relative mt-10 overflow-hidden bg-white sm:mt-4">
      {/* Main Content */}
      <div className="relative z-10 mx-auto flex flex-col items-center justify-between gap-8 md:flex-row lg:px-8">
        <div className="order-1 w-full text-center md:order-none md:text-left">
          <h1 className="text-5xl font-bold sm:text-6xl">
            Discover our ultimate
          </h1>
          <h2 className="stroke-text mt-2 text-6xl font-bold text-transparent sm:text-7xl md:text-8xl lg:text-[6rem] lg:leading-none">
            Collection.
          </h2>
          <style>{`
            .stroke-text {
              -webkit-text-stroke: 2px black;
            }
          `}</style>
          <p className="mt-4 mb-6 text-sm text-gray-500 md:text-base">
            Create your own visual style. Let it be unique for yourself and yet
            identifiable for others. <br />
            Check out our collection to identify who you are.
          </p>
          <button className="bg-[#1A1A1A] px-8 py-3 text-sm font-medium text-white shadow-md">
            Shop Now
          </button>
        </div>

        <div className="relative order-2 w-full max-w-xl bg-neutral-200 md:order-none">
          <img src="/hero.png" alt="Model" className="mx-auto" />

          <div className="absolute top-10 left-10 hidden w-32 bg-white p-3 text-sm sm:w-36 sm:p-2 md:w-24 lg:block lg:w-40">
            <img src="/hero-mini1.jpg" alt="Bucket Denim" className="w-full" />
            <div className="p-1">
              {" "}
              <p className="mt-2 font-semibold">Bucket Denim</p>
              <p className="text-xs text-gray-500">$298.00 USD</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
          </div>

          <div className="absolute top-10 right-10 hidden w-32 bg-white p-2 text-sm sm:w-36 sm:p-2 md:w-24 lg:block lg:w-40">
            <img src="/hero-mini.jpg" alt="Elastic Bra" className="w-full" />
            <div className="p-1">
              {" "}
              <p className="mt-2 font-semibold">Bucket Denim</p>
              <p className="text-xs text-gray-500">$298.00 USD</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
          </div>

          <div className="sm:p-2md:w-24 absolute bottom-10 left-1/2 hidden w-32 -translate-x-1/2 bg-white p-2 text-sm sm:w-36 lg:block lg:w-40">
            <img
              src="/hero-mini2.jpg"
              alt="Invisible Zip Denim"
              className="w-full"
            />
            <div className="p-1">
              {" "}
              <p className="mt-2 font-semibold">Bucket Denim</p>
              <p className="text-xs text-gray-500">$298.00 USD</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
