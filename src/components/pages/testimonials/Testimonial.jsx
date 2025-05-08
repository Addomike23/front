import React from "react";
import { Star } from "lucide-react";
import axios from "axios";

const testimonials = [
  {
    name: "Sarah Johnson",
    feedback:
      "The products are top-notch and the delivery was super fast! Highly recommended!",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Mike Thompson",
    feedback:
      "Great customer service and the quality of the product exceeded my expectations.",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    name: "Emily Davis",
    feedback:
      "Love the shopping experience on this site. Smooth, simple, and fast!",
    image:
      "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
];

export default function Testimonial() {
  return (
    <div className="w-full bg-[#f9f9f9] py-16 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {testimonial.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">{testimonial.feedback}</p>
            <div className="flex gap-1 text-yellow-500">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" stroke="none" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
