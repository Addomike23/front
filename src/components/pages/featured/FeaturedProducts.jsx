import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../context/Context";
import axios from "axios";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const { BASE_URL } = useCart();
    const scrollRef = useRef();

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/latest-product`);
            setProducts(res.data.products);
            
        } catch (error) {
            
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            scroll('right');
        }, 3000); // change 3000 to adjust speed (ms)
    
        return () => clearInterval(interval); // cleanup on unmount
    }, []);
    
// slide latest product 
    const scroll = (direction) => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = 120;
            if (direction === 'right') {
                const maxScrollLeft = container.scrollWidth - container.clientWidth;
                if (container.scrollLeft + scrollAmount >= maxScrollLeft) {
                    container.scrollTo({ left: 0, behavior: 'smooth' }); // loop back
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                if (container.scrollLeft - scrollAmount <= 0) {
                    container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' }); // loop to end
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        }
    };
    

    return (
        <div className="w-full bg-[#ffffff] py-16 px-6 md:px-12 relative">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Products</h2>

            {/* Arrows */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-[50%] z-2 bg-gray-200 shadow-md rounded-full p-2 hover:bg-orange-400"
            >
                <ChevronLeft />
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-[50%] z-2 bg-gray-200 shadow-md rounded-full p-2 hover:bg-orange-400"
            >
                <ChevronRight />
            </button>

            {/* Scrollable Product Row */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-hidden scroll-smooth no-scrollbar p4"
            >
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="min-w-[220px] max-w-[220px] mb-4 shadow-lg shadow-orange-700/70  bg-white rounded-md hover:shadow-md transition px-2"
                    >
                        <div className="relative w-full h-[220px] overflow-hidden rounded">
                            <img
                                src={`${BASE_URL}/images/${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-md"
                            />
                            {product.stock && (
                                <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-md z-2">
                                    Sale
                                </div>
                            )}
                        </div>

                        <div className="mt-4 space-y-1">
                            {/* <p className="text-gray-500 text-xs">{product.category}</p> */}
                            <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>

                            <div className="flex items-center gap-2 mt-1">
                                {product.oldPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        ${product.oldPrice}
                                    </span>
                                )}
                                <span className="text-sm font-semibold text-gray-900">
                                    ${product.price}
                                </span>
                            </div>

                            <div className="flex gap-1 text-yellow-500 mt-2 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} fill="currentColor" stroke="none" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
