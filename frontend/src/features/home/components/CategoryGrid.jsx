const categories = [
  {
    title: "Women's Clothing",
    image: "/women.jpg", // Replace with your actual image path
    link: "/womens",
  },
  {
    title: "Men's Clothing",
    image: "/men.jpg", // Replace with your actual image path
    link: "/mens",
  },
];

const CategoryGrid = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
      {categories.map((cat, index) => (
        <a
          key={index}
          href={cat.link}
          className="group relative overflow-hidden"
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center text-white">
            <h2 className="text-2xl font-light tracking-widest md:text-3xl">
              {cat.title}
            </h2>
            <span className="mt-2 border-b border-white pb-1 text-sm tracking-widest transition hover:border-gray-300">
              Shop Now &rarr;
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CategoryGrid;
