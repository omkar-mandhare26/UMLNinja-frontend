import DocumentDownArrow from "../icons/DocumentDownArrow";
import ShieldCheck from "../icons/ShieldCheck";
import CreditCard from "../icons/CreditCard";
import CPUChip from "../icons/CPUChip";
import Globe from "../icons/Globe";
import Users from "../icons/Users";
import Card from "../components/Card";
import { useEffect } from "react";

const featuresList = [
    {
        heading: "AI-Powered UML Generation",
        text: "Generate UML diagrams instantly using AI. Simply describe your idea in natural language, and UMLNinja converts it into accurate PlantUML code.",
        startIcon: <CPUChip />,
    },
    {
        heading: "Image & Code Export",
        text: "Easily export your generated PlantUML code or download UML diagrams as SVG or PNG for use in your projects.",
        startIcon: <DocumentDownArrow />,
    },
    {
        heading: "Fast & Secure",
        text: "Built with the latest MERN stack technologies, ensuring high performance and secure data handling.",
        startIcon: <ShieldCheck />,
    },
    {
        heading: "Pay as Per You Go",
        text: "Get started with free credits! Purchase additional credits to generate more UML diagrams as needed.",
        startIcon: <CreditCard />,
    },
    {
        heading: "Share & Collaborate",
        text: "Easily share UML diagrams with team members via unique links, enabling efficient collaboration.",
        startIcon: <Globe />,
    },
    {
        heading: "Web-Based & Accessible",
        text: "No need to install anything—access UMLNinja from any browser on desktop or mobile.",
        startIcon: <Users />,
    },
];

const FeaturesPage = () => {
    useEffect(() => {
        document.title = "UMLNinja Features";
    }, []);
    return (
        <div className="max-w-6xl p-6 mx-auto text-primary-100">
            <h1 className="mb-6 text-3xl font-bold text-center">
                Features of UMLNinja
            </h1>
            <p className="mb-10 text-lg text-center text-primary-200">
                UMLNinja offers powerful AI-driven diagram generation, export
                options, collaboration tools, and seamless accessibility.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {featuresList.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex justify-center transition-all duration-300 hover:scale-105"
                    >
                        <Card
                            variant="light"
                            heading={feature.heading}
                            text={feature.text}
                            startIcon={feature.startIcon}
                            className="hover:shadow-[0px_5px_15px_rgba(0,0,0,0.2)]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesPage;
