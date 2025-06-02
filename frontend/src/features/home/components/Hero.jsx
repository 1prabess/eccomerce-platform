import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4">
      <div className="relative hidden items-center justify-center bg-neutral-100 lg:flex">
        <img src="/hero1.png" alt="" className="ml-24 h-auto max-w-full" />
      </div>

      <div className="flex w-full flex-col items-center justify-between">
        <div>
          <div className="mx-auto flex h-full max-w-[90%] flex-col items-center justify-center py-6 text-center sm:max-w-[80%] lg:mt-15 lg:max-w-full">
            <h1 className="text-5xl font-semibold text-gray-800 sm:text-6xl md:text-6xl">
              Ultimate
            </h1>
            <h2 className="stroke-text mt-2 text-[8rem] leading-none font-bold text-transparent sm:text-[8rem] md:text-[8rem] lg:text-[8rem]">
              SALE
            </h2>
            <p className="mt-4 text-sm tracking-widest text-gray-700 sm:text-base md:text-lg">
              NEW COLLECTION
            </p>
            <Button className="mt-6 rounded-none px-8 py-6 text-sm sm:px-10 sm:text-base md:px-14">
              SHOP NOW
            </Button>

            <style>{`
              .stroke-text {
                -webkit-text-stroke: 2px black;
              }
            `}</style>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-neutral-100">
        <img src="/hero2.png" alt="" className="h-auto max-w-full" />
      </div>
    </div>
  );
};

export default Hero;
