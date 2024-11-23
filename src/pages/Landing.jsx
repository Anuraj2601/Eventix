
import Clubsforu from "../components/Clubsforu"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import LandingNav from "../components/LandingNav"
import MainCarousel from "../components/MainCarousel"
import UpcomingEvent from "../components/UpcomingEvent"

const Landing = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold no-underline">
        <LandingNav />
        <div className="max-w-full pt-0 px-0 m-0 bg-neutral-900">
          <HeroSection />
          <Clubsforu />
          <UpcomingEvent />
          <MainCarousel />
          <Footer />
        </div>
      </h1>
    </div>
  )
}

export default Landing
