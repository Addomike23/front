import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  ShieldCheck,
  ThumbsUp,
  Clock,
  Truck,
  DollarSign,
  Smile,
} from "lucide-react"; // Import icons from Lucide

const WhyChooseUs = () => {
  const [whychooseus, setWhychooseus] = useState([]);
  const BASE_URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/welcome-text`);
        const data = response.data;
        setWhychooseus(data.WhyChooseUs);
      } catch (error) {
        console.error("Error fetching welcome messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Optional: You can assign specific icons or rotate
  const icons = [
    <ShieldCheck size={28} />,
    <ThumbsUp size={28} />,
    <Clock size={28} />,
    <Truck size={28} />,
    <DollarSign size={28} />,
    <Smile size={28} />,
  ];

  return (
    <div className='w-full py-10 px-4 bg-[#ffffff]'>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Why Choose Us</h1>
      </div>

      <div className="container mx-auto">
        <div className="flex w-full md:grid md:grid-cols-3 gap-6 overflow-x-scroll md:overflow-hidden snap-x flex-nowrap scrollbar-hide px-2">
          {whychooseus.map((item, index) => (
            <div
              key={index}
              className="shadow-md shadow-orange-100 bg-white border border-orange-100 rounded-xl p-6 text-center min-w-[80%] md:min-w-0 md:w-full max-w-md mx-auto transition-all hover:shadow-orange-300 hover:bg-orange-400 text-white cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center mx-auto bg-orange-100 text-orange-500 rounded-full mb-4">
                {icons[index % icons.length]}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
