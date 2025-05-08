import React from 'react';
import { promo } from '../../../assets/Assets';

const Promo = () => {
    return (
        <div className="w-full bg-gray-100 py-8 px-5">
            {/* Title */}
            <div className="text-center py-4">
                <h1 className="text-4xl md:text-4xl font-bold text-gray-900">
                    PROMO FOR ALL CUSTOMERS
                </h1>
            </div>

            {/* Slidable on small screens */}
            <div className="container mx-auto">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-scroll md:overflow-hidden snap-x flex-nowrap scrollbar-hide p-4">
                    {promo.map((promos, index) => (
                        <div
                            key={promos.id || index}
                            className="relative min-w-[90%] md:min-w-0 md:w-full max-w-lg mx-auto rounded-lg overflow-hidden flex items-center snap-start"
                        >
                            {/* Image */}
                            <img
                                src={promos.img}
                                alt={promos.title}
                                className="w-full h-64 object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-700/80 to-transparent flex flex-col justify-center items-start text-white p-6">
                                <h1 className="text-xl md:text-2xl font-bold">{promos.title}</h1>
                                <p className="text-sm md:text-base mt-2">{promos.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Promo;
