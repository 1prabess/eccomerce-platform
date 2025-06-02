import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "“Best fitted white denim than more than expected flexible and crazy soft.”",
    author: "DENIM CRAZE",
  },
  {
    text: "“More than expected crazy soft, flexible and best fitted white simple denim shirt.”",
    author: "CASUAL WAY",
  },
  {
    text: "“Best fitted white denim shirt more than expected flexible and crazy soft.”",
    author: "UPTOP",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(1);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 overflow-hidden px-4 text-center md:my-20">
      <h3 className="text-xs font-medium tracking-widest text-gray-800 uppercase">
        We love good compliment
      </h3>

      <div className="relative mx-auto flex h-[200px] w-full max-w-5xl items-center justify-center">
        {testimonials.map((item, index) => {
          const isCurrent = index === current;
          const isLeft =
            index === (current - 1 + testimonials.length) % testimonials.length;
          const isRight = index === (current + 1) % testimonials.length;

          const baseStyle = "absolute w-full px-4 transition-all duration-300";
          const textStyle = isCurrent
            ? "text-black opacity-100 scale-100"
            : "text-gray-400 opacity-30 scale-90";
          const positionStyle = isCurrent
            ? "z-10"
            : isLeft
              ? "-translate-x-full"
              : isRight
                ? "translate-x-full"
                : "hidden";

          return (
            <div
              key={index}
              className={`${baseStyle} ${textStyle} max-w-2xl ${positionStyle}`}
            >
              <p className="font-serif text-xl leading-snug md:text-3xl">
                {item.text}
              </p>
              <p className="mt-4 text-xs tracking-widest uppercase">
                {item.author}
              </p>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              current === index ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
