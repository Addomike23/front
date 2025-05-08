import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Hero from "../hero/Hero";
import Promo from "../promo/Promo";
import ShopCategory from "../shopcategory/shopCategory";
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
    const [category, setCategory] = useState("All")




    useEffect(() => {

        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);

    }, [])





    return (
        < div className="" >

            {loading ? (
                <div className="flex items-center justify-center h-screen  bg-gray-800">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-400"></div>
                </div>
            ) :
                (
                    <div>
                        {/* Navbar section */}

                        <Navbar />
                        {/* <HeroBanner/> */}

                        {/* service */}
                        <ScrollFadeIn direction="left">
                            <Services />
                        </ScrollFadeIn>

                        {/* featured products */}
                        <ScrollFadeIn direction="up">
                            <FeaturedProducts />
                        </ScrollFadeIn>

                        {/* Promo section */}
                        <ScrollFadeIn direction="up">
                            <Promo />
                        </ScrollFadeIn>

                        {/* Why choosae us */}
                        <ScrollFadeIn direction="up">
                            <WhyChooseUs />
                        </ScrollFadeIn>
                        {/* Hero section */}
                        {/* Shop by category */}
                        <ScrollFadeIn direction="up">
                            <ShopCategory category={category} setCategory={setCategory} />
                        </ScrollFadeIn>

                        <ScrollFadeIn direction="up">
                            <Hero category={category} />
                        </ScrollFadeIn>

                        {/* auto play video */}
                        <ScrollFadeIn direction="up">
                            <AutoPlayVideo />
                        </ScrollFadeIn>

                        {/* contact page */}
                        <ScrollFadeIn direction="up">
                            <ContactPage />
                        </ScrollFadeIn>

                        {/* news letter */}
                        <ScrollFadeIn direction="up">
                            <NewsletterSection />
                        </ScrollFadeIn>

                        {/* testimonials */}

                        <ScrollFadeIn direction="up">
                            <Testimonial />
                        </ScrollFadeIn>

                        {/*  footer section*/}
                        <ScrollFadeIn direction="up">
                            <Footer />
                        </ScrollFadeIn>
                    </div>
                )
            }

        </div>
    );
}
