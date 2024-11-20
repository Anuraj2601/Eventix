import React from "react";
import Clubsforu from "../components/Clubsforu";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LandingNav from "../components/LandingNav";
import UpcomingEvent from "../components/UpcomingEvent";

const Landing = () => {
  return (
    <div>
      <LandingNav />
      <div className="max-w-full pt-0 px-0 m-0 bg-neutral-900">
        {/* Hero Section */}
        <section id="Home" className="py-16">
          <HeroSection />
        </section>
 {/* Events Section */}
 <section id="Events" className="py-16">
          <UpcomingEvent />
        </section>
        {/* Clubs Section */}
        <section id="Clubs" className="py-16">
          <Clubsforu />
        </section>

       

        {/* About Us Section */}
        <section id="About-us" className="py-16">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default Landing;
