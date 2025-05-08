import React, { useState, useEffect } from 'react';
// import { latest_products } from '../../../assets/Assets';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/Context';
import axios from 'axios'



const Hero = ({ category }) => {
    const { addToCart,BASE_URL } = useCart()
    const [product, setProduct] = useState([])
    



    // fetch products from backend
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/products`, {
                withCredentials: true,
            })
            setProduct(res.data.products)
           
        } catch (error) {
        

        }

    }

    useEffect(() => {
        fetchProduct();
    }, [])

    const filteredProducts = product.filter(
        (product) => category === "All" || product.category === category
    );

    return (
        <div className="container mx-auto p-4 bg-gray-100">
            <h2 className="text-2xl font-bold text-center mb-6">Featured Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredProducts.map((latest) => (
                    <div
                        key={latest._id}
                        className="bg-white shadow-lg shadow-orange-700/70 rounded-lg p-2 transition-transform transform hover:scale-105 flex flex-col items-center"
                    >
                        {/* Product Image */}
                        <img
                            src={`${BASE_URL}/images/` + latest.image}
                            // src={latest.img}
                            alt={latest.name}
                            className="w-full h-40 sm:h-48 md:h-55 rounded-t-lg"
                        />

                        {/* Product Details */}
                        <div className="text-center">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-800">{latest.name}</h3>
                                <p className="text-bold text-orange-500 pl-2.5">stock:{latest.stock}</p>
                            </div>
                            {/* <p className="text-sm text-gray-600 mt-2">{latest.description}</p> */}

                            {/* Star Rating */}
                            <div className="flex justify-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                    i < latest.rating ?
                                        <FaStar key={i} className="text-yellow-500" /> :
                                        <FaRegStar key={i} className="text-gray-400" />
                                ))}
                            </div>

                            {/* Price & Cart Icon */}
                            <div className="mt-3 flex items-center justify-between w-full  ">
                                <p className="text-lg pr-2 font-bold text-orange-500">Ghc {latest.price}</p>
                                <button
                                    onClick={() => addToCart(latest)}
                                    className="bg-gray-800 text-white p-3 rounded-full hover:bg-orange-500 transition"
                                    title="Add to Cart"
                                >
                                    <FiShoppingCart className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
