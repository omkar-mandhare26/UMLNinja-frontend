import Features from "../components/Features";
import DiagramSlider from "../components/DiagramSlider";
import { Link } from "react-router-dom";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        document.title = "UMLNinja - Create UML Diagrams in Minutes";
    }, []);

    return (
        <>
            {/* Main Container */}
            <div className="mt-7">
                <div className="mb-1 text-2xl font-bold tracking-wider text-center font-heading">
                    Create professional UML diagrams in minutes for your project
                    documentation
                </div>
                <div className="flex justify-center">
                    <div className="w-3/5 text-lg text-center">
                        UMLNinja is an AI-powered tool that allows you to
                        effortlessly create UML diagrams for your project
                        documentation. Simply input a prompt, and our advanced
                        AI will generate the corresponding PlantUML code, which
                        you can use to visualize your ideas quickly and
                        accurately
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link
                        to={"/signup"}
                        className="px-4 py-2 mt-4 text-lg transition duration-300 rounded-md bg-info hover:bg-info-hover"
                    >
                        Get Started
                    </Link>
                </div>
                <DiagramSlider />
            </div>
            <Features />
            <Pricing />
            <FAQ />
        </>
    );
};

export default Home;
