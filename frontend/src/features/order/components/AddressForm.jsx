const AddressForm = ({ shippingAddress, handleInputChange }) => {
  const inputStyle =
    "w-full border border-gray-400 px-2 py-2 text-sm focus:outline-none focus:border-black placeholder:text-gray-500";

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold tracking-wide">
        Shipping <span className="font-bold">Address</span>
      </h2>

      <input
        name="street"
        value={shippingAddress.street}
        onChange={handleInputChange}
        placeholder="Street"
        className={inputStyle}
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <input
          name="city"
          value={shippingAddress.city}
          onChange={handleInputChange}
          placeholder="City"
          className={inputStyle}
        />
        <input
          name="state"
          value={shippingAddress.state}
          onChange={handleInputChange}
          placeholder="State"
          className={inputStyle}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <input
          name="postalCode"
          value={shippingAddress.postalCode}
          onChange={handleInputChange}
          placeholder="Postal Code"
          className={inputStyle}
        />
        <input
          name="country"
          value={shippingAddress.country}
          onChange={handleInputChange}
          placeholder="Country"
          className={inputStyle}
        />
      </div>
      <input
        name="phone"
        value={shippingAddress.phone}
        onChange={handleInputChange}
        placeholder="Phone"
        className={`${inputStyle} mt-4`}
      />
    </div>
  );
};

export default AddressForm;
