const PlaceOrderButton = ({ onClick, isLoading }) => (
  <button
    className="w-full bg-black py-3 font-medium tracking-wide text-white transition hover:bg-gray-800"
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? "Placing order..." : "Place order"}
  </button>
);

export default PlaceOrderButton;
