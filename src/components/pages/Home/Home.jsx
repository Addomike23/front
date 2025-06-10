import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import Hero from "../hero/Hero";
import Promo from "../promo/Promo";
import ShopCategory from "../shopcategory/ShopCategory";
import WhyChooseUs from "../why choose us/WhyChooseUs";
import Footer from "../footer/Footer";
import ScrollFadeIn from "../../animation/ScrollFadeIn";
import FeaturedProducts from "../featured/FeaturedProducts";
import Testimonial from "../testimonials/Testimonial";
import NewsletterSection from "../news/NewsletterSection";
import ContactPage from "../contact/ContactPage";
import Services from "../services/Services";
import AutoPlayVideo from "../autoplay/AutoPlayVideo";


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const handlePageLoad = () => setLoading(false);

        if (document.readyState === "complete") {
            handlePageLoad();
        } else {
            window.addEventListener("load", handlePageLoad);
        }

        return () => window.removeEventListener("load", handlePageLoad);
    }, []);

    return (
        <div>
            {loading ? (
                
                <div className="flex items-center justify-center h-screen bg-gray-900">
                    <motion.div
                        className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                </div>
            ) : (
                // ✅ Page content with fade-in
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Navbar */}
                    <Navbar />

                    {/* Featured Products */}
                    <ScrollFadeIn direction="up">
                        <FeaturedProducts />
                    </ScrollFadeIn>

                    {/* Services */}
                    <ScrollFadeIn direction="left">
                        <Services />
                    </ScrollFadeIn>

                    {/* Promo */}
                    <ScrollFadeIn direction="up">
                        <Promo />
                    </ScrollFadeIn>

                    {/* Category Section */}
                    <ScrollFadeIn direction="up">
                        <ShopCategory category={category} setCategory={setCategory} />
                    </ScrollFadeIn>

                    {/* Hero Section */}
                    <Hero category={category} />

                    {/* AutoPlay Video */}
                    <ScrollFadeIn direction="up">
                        <AutoPlayVideo />
                    </ScrollFadeIn>

                    {/* Contact */}
                    <ScrollFadeIn direction="up">
                        <ContactPage />
                    </ScrollFadeIn>

                    {/* Why Choose Us */}
                    <ScrollFadeIn direction="up">
                        <WhyChooseUs />
                    </ScrollFadeIn>

                    {/* Newsletter */}
                    <ScrollFadeIn direction="up">
                        <NewsletterSection />
                    </ScrollFadeIn>

                    {/* Testimonials */}
                    <ScrollFadeIn direction="up">
                        <Testimonial />
                    </ScrollFadeIn>

                    {/* Optional: Trending Brands */}
                    {/* <ScrollFadeIn direction="up">
                        <TrendingBrands />
                    </ScrollFadeIn> */}

                    {/* Footer */}
                    <ScrollFadeIn direction="up">
                        <Footer />
                    </ScrollFadeIn>
                </motion.div>
            )}
        </div>
    );
}
