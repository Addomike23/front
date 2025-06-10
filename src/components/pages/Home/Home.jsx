import React, { useState, useEffect } from "react";
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
// import TrendingBrands from "../tradebrands/TrendingBrands"; // optional

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
                
                <div className="flex items-center justify-center h-screen bg-gray-800">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-400"></div>
                </div>
            ) : (
                <div>
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

                    {/* Contact Page */}
                    <ScrollFadeIn direction="up">
                        <ContactPage />
                    </ScrollFadeIn>

                    {/* Why Choose Us */}
                    <ScrollFadeIn direction="up">
