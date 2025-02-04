import { useState, useEffect } from "react";

interface Image {
    url: string;
    name: string;
}

const DiagramSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images: Image[] = [
        { url: "/classDiagram.png", name: "Class Diagram" },
        { url: "/objectDiagram.png", name: "Object Diagram" },
        { url: "/useCaseDiagram.png", name: "Use Case Diagram" },
        { url: "/sequenceDiagram.png", name: "Sequence Diagram" },
        { url: "/activityDiagram.png", name: "Activity Diagram" },
        { url: "/stateChartDiagram.png", name: "State Chart Diagram" },
        { url: "/componentDiagram.png", name: "Component Diagram" },
        { url: "/deploymentDiagram.png", name: "Deployment Diagram" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="min-w-full py-4 mx-auto mt-10 bg-primary-500">
            <div className="relative flex items-center justify-center overflow-hidden rounded-lg shadow-lg h-[475px]">
                <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${images.length * 100}%`,
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center flex-shrink-0 w-full h-full"
                        >
                            <img
                                src={image.url}
                                alt={image.name}
                                className="object-contain w-full mb-10 h-[420px]"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-sm font-semibold text-center text-white">
                                {image.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            currentIndex === index
                                ? "bg-info w-5"
                                : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default DiagramSlider;
