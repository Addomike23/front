import React from "react";

const brandLogos = [
  { name: "Samsung", url: "https://1000logos.net/wp-content/uploads/2016/10/Samsung-Logo.png" },
  { name: "Apple", url: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png" },
  { name: "TCL", url: "https://upload.wikimedia.org/wikipedia/commons/5/58/TCL_Logo_2021.svg" },
  { name: "Infinix", url: "https://seeklogo.com/images/I/infinix-logo-CA3E1DD6E0-seeklogo.com.png" },
  { name: "Binatone", url: "https://www.binatoneglobal.com/wp-content/uploads/2020/10/Binatone-logo.png" },
  { name: "Bruhm", url: "https://bruhm.com.ng/wp-content/uploads/2020/01/bruhm.png" },
  { name: "LG", url: "https://1000logos.net/wp-content/uploads/2021/11/LG-logo.png" },
  { name: "Sony", url: "https://1000logos.net/wp-content/uploads/2016/10/Sony-logo.png" },
];

const TrendingBrands = () => {
  return (
    <section className="w-full bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Trending Brands</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {brandLogos.map((brand, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 w-36 h-24 flex items-center justify-center"
          >
            <img
              src={brand.url}
              alt={brand.name}
              className="max-h-16 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingBrands;
