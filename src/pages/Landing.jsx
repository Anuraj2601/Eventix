
import Clubsforu from "../Components/Clubsforu"
import Footer from "../Components/Footer"
import HeroSection from "../Components/HeroSection"
import Navbar from "../Components/Navbar"
import UpcomingEvent from "../Components/UpcomingEvent"

const Landing = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold no-underline">
        <Navbar />
        <div className="max-w-full pt-0 px-0 m-0 bg-neutral-900">
          <HeroSection />
          <Clubsforu />
          <UpcomingEvent />
          <Footer />
        </div>
      </h1>
    </div>
  )
}

export default Landing
