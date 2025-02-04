import DocumentDownArrow from "../icons/DocumentDownArrow";
import ShieldCheck from "../icons/ShieldCheck";
import CreditCard from "../icons/CreditCard";
import CPUChip from "../icons/CPUChip";
import Globe from "../icons/Globe";
import Users from "../icons/Users";
import Card from "./Card";

const feautres = [
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

const Features = () => (
    <div className="flex items-center justify-center bg-primary-100">
        <div className="grid w-3/4 grid-cols-3 mt-7 sm:grid-cols-2 md:grid-cols-3 ">
            {feautres.map((val, idx) => (
                <div
                    key={idx}
                    className="flex justify-center transition-all duration-300 mb-7 hover:scale-105"
                >
                    <Card
                        variant="dark"
                        heading={val.heading}
                        text={val.text}
                        startIcon={val.startIcon}
                        className="hover:shadow-[0px_5px_15px_rgba(0,0,0,0.2)]"
                    />
                </div>
            ))}
        </div>
    </div>
);

export default Features;
