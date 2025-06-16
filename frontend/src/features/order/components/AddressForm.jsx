const AddressForm = ({ shippingAddress, handleInputChange, errors = {} }) => {
  const inputStyle =
    "w-full border border-gray-400 px-2 py-2 text-sm focus:outline-none focus:border-black placeholder:text-gray-500";
  const errorStyle = "text-xs text-red-500 mt-1";

  return (
    <div>
      <h2 className="my-6 text-2xl font-semibold">
        <span className="text-gray-500">Shipping </span>
        <span className="font-bold">Address</span>
        <hr className="mt-1 w-20 border-t-2 border-black sm:w-24" />
      </h2>

      <div className="mb-4">
        <input
          name="street"
          value={shippingAddress.street}
          onChange={handleInputChange}
          placeholder="Street"
          className={inputStyle}
        />
        {errors.street && <p className={errorStyle}>{errors.street}</p>}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <input
            name="city"
            value={shippingAddress.city}
            onChange={handleInputChange}
            placeholder="City"
            className={inputStyle}
          />
          {errors.city && <p className={errorStyle}>{errors.city}</p>}
        </div>
        <div>
          <input
            name="state"
            value={shippingAddress.state}
            onChange={handleInputChange}
            placeholder="State"
            className={inputStyle}
          />
          {errors.state && <p className={errorStyle}>{errors.state}</p>}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <input
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            className={inputStyle}
          />
          {errors.postalCode && (
            <p className={errorStyle}>{errors.postalCode}</p>
          )}
        </div>
        <div>
          <input
            name="country"
            value={shippingAddress.country}
            onChange={handleInputChange}
            placeholder="Country"
            className={inputStyle}
          />
          {errors.country && <p className={errorStyle}>{errors.country}</p>}
        </div>
      </div>

      <div>
        <input
          name="phone"
          value={shippingAddress.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className={inputStyle}
        />
        {errors.phone && <p className={errorStyle}>{errors.phone}</p>}
      </div>
    </div>
  );
};

export default AddressForm;
