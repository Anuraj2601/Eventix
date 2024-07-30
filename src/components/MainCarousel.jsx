import { useEffect, useRef } from 'react';
import madhack from '../assets/madhack.jpg';

const images = [madhack, madhack, madhack, madhack, madhack, madhack, madhack, madhack];

const MainCarousel = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

                if (scrollLeft + clientWidth >= scrollWidth - 3) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carouselRef.current.scrollBy({
                        left: 300,
                        behavior: 'smooth',
                    });
                }
            }
        }, 100);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <div className="bg-none mb-20 w-[82vw] ml-32 h-[62vh]">
            <div 
                ref={carouselRef} 
                className="flex space-x-10 overflow-x-scroll scrollbar-hide"
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`carousel-${index}`}
                        className="w-1/3 h-[60vh] object-cover rounded-md hover:border border-primary"
                    />
                ))}
            </div>
        </div>
    );
}

export default MainCarousel;
