// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Context";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { BASE_URL, addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, BASE_URL]);

  const handleAddToCart = () => {
    addToCart(product);
    setMessage("Product added to cart!");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-orange-400 rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">Product not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SubNavbar />

      <div className="max-w-6xl mx-auto px-4 py-10 mt-25">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow p-4">
            <img
              src={`${BASE_URL}/images/${product.image}`}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p className="text-green-600 text-2xl font-semibold mb-2">
              GH₵ {product.price.toFixed(2)}
            </p>
            <p className={`text-sm font-medium mb-4 ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 font-semibold rounded-lg transition ${
                product.stock > 0
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>

            {message && (
              <div className="mt-4 text-green-600 text-sm font-medium">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
