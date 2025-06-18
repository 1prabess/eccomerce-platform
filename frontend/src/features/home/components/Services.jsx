const Services = () => {
  const services = [
    {
      title: "Customer Care",
      description:
        "Our support team is here to help with online orders, returns, and product inquiries.",
    },
    {
      title: "Style Appointments",
      description:
        "Book time with one of our in-house stylists for personalized outfit recommendations.",
    },
    {
      title: "Tailoring Services",
      description:
        "Get the perfect fit with our in-store tailoring — available by appointment.",
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 divide-y divide-gray-200 border-y text-center md:grid-cols-3 md:divide-x md:divide-y-0">
      {services.map((service, idx) => (
        <div key={idx} className="p-8">
          <h3 className="text-lg font-semibold tracking-wider text-gray-900 uppercase">
            {service.title}
          </h3>
          <p className="mt-4 text-sm text-gray-700">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
