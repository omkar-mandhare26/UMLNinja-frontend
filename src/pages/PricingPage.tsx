import { useEffect } from "react";

const plans = [
    {
        name: "Free",
        description: "Best for Beginners",
        price: "₹0",
        link: "/login",
        isMainPlan: false,
        features: [
            { text: "5 Credits", included: true },
            { text: "PNG Export", included: true },
            { text: "Cloud Storage", included: true },
            { text: "Shareable Link", included: false },
            { text: "No Watermark", included: false },
            { text: "SVG Export", included: false },
            { text: "PlantUML Code", included: false },
        ],
    },
    {
        name: "Pro",
        description: "Best for Budget",
        price: "₹149/-",
        link: "/pro-plan",
        isMainPlan: true,
        features: [
            { text: "100 Credits", included: true },
            { text: "PNG Export", included: true },
            { text: "Cloud Storage", included: true },
            { text: "Shareable Link", included: true },
            { text: "No Watermark", included: true },
            { text: "SVG Export", included: false },
            { text: "PlantUML Code", included: false },
        ],
    },
    {
        name: "Professional",
        description: "Best for Professionals",
        price: "₹499/-",
        link: "/professional-plan",
        isMainPlan: false,
        features: [
            { text: "750 Credits", included: true },
            { text: "PNG Export", included: true },
            { text: "Cloud Storage", included: true },
            { text: "Shareable Link", included: true },
            { text: "No Watermark", included: true },
            { text: "SVG Export", included: true },
            { text: "PlantUML Code", included: true },
        ],
    },
];

const PricingPage = () => {
    useEffect(() => {
        document.title = "UMLNinja Pricing";
    }, []);
    return (
        <div className="flex items-center justify-center p-8">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg shadow-lg bg-white text-primary-500 transition-all duration-300`}
                    >
                        <h2 className="text-2xl font-semibold text-center">
                            {plan.name}
                        </h2>
                        <p className="mt-2 text-xl text-center">
                            {plan.description}
                        </p>
                        <div className="mt-4 text-3xl font-bold text-center">
                            {plan.price}
                        </div>
                        <div className="mt-6">
                            <ul>
                                {plan.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className={`flex justify-between items-center py-2 ${
                                            feature.included
                                                ? "text-success"
                                                : "text-primary-300"
                                        }`}
                                    >
                                        <span>{feature.text}</span>
                                        {feature.included ? (
                                            <span className="text-success">
                                                ✓
                                            </span>
                                        ) : (
                                            <span className="text-primary-300">
                                                ✗
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 text-center">
                            <a
                                href={plan.link}
                                className="px-6 py-2 text-white transition-all rounded-lg bg-info hover:bg-info-hover"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;
