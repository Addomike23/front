import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/Context";
import { Link, useSearchParams } from "react-router-dom";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";

// Dynamic categories matching your DB
const categories = [
  { name: "laptop" },
  { name: "rice cooker" },
  { name: "blender" },
  { name: "tv" },
  { name: "iron" },
  { name: "hair dryer" },
  { name: "donut machine" },
  { name: "halogen oven" },
  { name: "ps5 gear" },
];

export default function ProductListingPage() {
  const { BASE_URL, LOCAL_HOST } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "price_low";
  const page = parseInt(searchParams.get("page") || 1);
  const limit = 10;
  const [mloading, setmLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setmLoading(false), 2000);
    return () => clearTimeout(timer);

  }, [])

  const updateFilter = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
  };
  



    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${BASE_URL}/api/filter`, {
            params: { search, category, sort, page, limit }
          });
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages || 1);
        } catch (err) {
          console.error("Error fetching products:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, [BASE_URL, category, sort, search, page]);

    return (
      <div>
        {mloading ? (
          <div className="flex items-center justify-center h-screen  bg-gray-800">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-400"></div>
          </div>
        ) : (
          <div>
            {/* // navbar */}
            <SubNavbar />

            <div className="px-4 py-6 max-w-7xl mx-auto mt-30">
              {/* Search */}
              <input
                type="text"
                placeholder="Search products..."
                className="w-full mb-6 border px-4 py-2 rounded-lg"
                value={search}
                onChange={(e) => updateFilter("search", e.target.value.toLowerCase())}
              />

              {/* Categories */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() =>
                        updateFilter("category", category === cat.name ? "" : cat.name)
                      }
                      className={`w-32 h-16 rounded-lg shadow text-center flex items-center justify-center font-medium capitalize ${cat.name === category ? "ring-2 ring-blue-500 bg-blue-100" : "bg-white"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* Sorting & Clear Filters */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <button
                  className="border border-gray-300 rounded px-4 py-1 text-sm mb-2 sm:mb-0"
                  onClick={() => setSearchParams({})}
                >
                  Clear Filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => updateFilter("sort", e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>

              {/* Product Grid */}
              {loading ? (
                <div className="text-center py-10 text-lg">Loading products...</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {products.map((product) => (
                      <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300"
                      >
                        <img
                          src={`${BASE_URL}/images/${product.image}`}
                          alt={product.name}
                          className="w-full h-40 sm:h-48 md:h-55 rounded-t-lg object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 text-lg truncate">
                            {product.name}
                          </h3>
                          {/* <p className="text-gray-600 text-sm mt-1 truncate">{product.description}</p> */}
                          {/* <p className="text-gray-500 text-sm mt-1 capitalize">{product.category}</p> */}
                          <p className="text-green-600 font-medium mt-2">₵{product.price.toFixed(2)}</p>
                          <p className="text-xs text-orange-400 mt-1">{product.stock>0? "In Stock": "Out of Stock"}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center gap-4 mt-10">
                    <button
                      onClick={() => updateFilter("page", page - 1)}
                      disabled={page === 1}
                      className="px-4 py-2 rounded text-white bg-orange-400 hover:bg-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm font-semibold mt-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => updateFilter("page", page + 1)}
                      disabled={page >= totalPages}
                      className="px-4 py-2 rounded text-white bg-orange-400 hover:bg-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* footer */}
            <Footer />
          </div>
        )
        }

      </div>

    );
  
}
