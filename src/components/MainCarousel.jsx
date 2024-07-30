import madhack from '../assets/madhack.jpg';

const images = [madhack, madhack, madhack, madhack, madhack, madhack, madhack, madhack];

const MainCarousel = () => {
    return (
        <div className="bg-none mb-20 w-[82vw] ml-32 h-[62vh]">
            <div className="flex space-x-10 overflow-x-scroll scrollbar-hide">
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
