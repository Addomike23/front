import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { useCart } from "../context/Context";
=======
import { motion } from 'framer-motion';
>>>>>>> b2272fa (update)
import {
  ShieldCheck,
  ThumbsUp,
  Clock,
  Truck,
  DollarSign,
  Smile,
} from "lucide-react";

const WhyChooseUs = () => {
  const [whychooseus, setWhychooseus] = useState([]);
  const {BASE_URL} = useCart();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/welcome-text`);
        const data = response.data;
        setWhychooseus(data.WhyChooseUs);
      } catch (error) {
        console.error("Error fetching welcome messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const icons = [
    <ShieldCheck size={28} />,
    <ThumbsUp size={28} />,
    <Clock size={28} />,
    <Truck size={28} />,
    <DollarSign size={28} />,
    <Smile size={28} />,
  ];

  return (
    <div className="w-full py-16 px-4 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Why Choose Us</h1>
      </div>

      <div className="container mx-auto">
        <div className="flex w-full md:grid md:grid-cols-3 gap-6 overflow-x-scroll md:overflow-hidden snap-x flex-nowrap scrollbar-hide px-2">
          {whychooseus.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-orange-100 rounded-2xl p-6 min-w-[80%] md:min-w-0 md:w-full max-w-md mx-auto shadow-lg hover:shadow-2xl hover:bg-orange-400 group transition-all duration-300 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-14 h-14 flex items-center justify-center mx-auto bg-orange-100 text-orange-500 rounded-full mb-4 transition-transform"
              >
                {icons[index % icons.length]}
              </motion.div>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-white mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
