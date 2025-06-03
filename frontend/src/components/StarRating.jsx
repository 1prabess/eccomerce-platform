export const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <span key={"full" + i}>★</span>
      ))}
      {halfStar && <span>☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={"empty" + i} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
};
