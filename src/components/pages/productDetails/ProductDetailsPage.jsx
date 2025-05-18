// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/Context";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { BASE_URL, LOCAL_HOST } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${LOCAL_HOST}/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, LOCAL_HOST]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-orange-400 rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-10 text-red-500">Product not found</div>;
  }

  return (
    <div>
      <SubNavbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <img
            src={`${BASE_URL}/images/${product.image}`}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-gray-500 capitalize mb-2">Category: {product.category}</p>
            <p className="text-green-600 font-semibold text-xl mb-2">₵{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-400">{product.stock>0? "in stock": "out of stock"}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
