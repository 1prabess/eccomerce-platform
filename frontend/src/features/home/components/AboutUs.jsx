import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-10">
      <div className="md:flex md:items-start md:gap-12">
        {/* Image Section */}
        <div className="mb-10 md:mb-0 md:w-1/2">
          <img src="/men.jpg" alt="Our story" className="w-full object-cover" />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="my-6 text-2xl font-semibold">
            <span className="text-gray-500">About </span>
            <span className="font-bold">Us</span>
            <hr className="mt-1 w-20 border-t-2 border-black sm:w-24" />
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            We started with a simple goal — to make high-quality fashion and
            lifestyle products more accessible, affordable, and enjoyable for
            everyone. From curated clothing collections to must-have
            accessories, we aim to bring you stylish, functional pieces that fit
            seamlessly into your life.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Over time, we've grown into more than just an online shop. We’re a
            community of creators, trendsetters, and conscious consumers. We
            prioritize sustainability, work with responsible suppliers, and
            ensure that every item we offer meets our standards of quality and
            ethics.
          </p>

          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            Our Mission
          </h3>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Our mission is to empower people to express themselves through
            fashion that’s inclusive, stylish, and thoughtfully crafted. We
            believe in transparency, trust, and providing an exceptional
            customer experience from start to finish.
          </p>

          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            Why Shop With Us?
          </h3>
          <ul className="ml-6 list-disc space-y-2 text-lg text-gray-700">
            <li>
              Curated collections that reflect the latest trends and timeless
              essentials.
            </li>
            <li>Fast and reliable delivery with secure payment options.</li>
            <li>Dedicated customer support and easy returns.</li>
            <li>Commitment to quality, ethics, and sustainability.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
