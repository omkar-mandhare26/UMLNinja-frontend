import CheckCircle from "../icons/CheckCircle";
import XCircle from "../icons/XCircle";
import { Link } from "react-router-dom";

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

const Pricing = () => (
    <div className="flex items-center justify-center bg-primary-500">
        <div className="flex items-center justify-center gap-28 my-14">
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className={`rounded-lg  bg-primary-100 text-primary-900 font-heading ${
                        plan.isMainPlan
                            ? "min-h-[500px] max-h-[500px] w-[350px] shadow-[0_0_25px_rgba(255,255,255,0.7)]"
                            : "min-h-[475px] max-h-[475px] w-80"
                    }`}
                >
                    <div className="rounded-t-lg bg-info">
                        <div className="pt-3 text-3xl font-semibold text-center">
                            {plan.name}
                        </div>
                        <div className="text-sm tracking-tight text-center text-secondary">
                            {plan.description}
                        </div>
                        <div className="pb-3 mt-3 text-3xl font-semibold text-center">
                            {plan.price}
                        </div>
                    </div>
                    <div>
                        {plan.features.map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 my-2 ml-4 font-body"
                            >
                                {feature.included ? (
                                    <CheckCircle className="w-5 h-5 text-success" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-danger" />
                                )}
                                <div>{feature.text}</div>
                            </div>
                        ))}
                        <div className="text-center mt-7">
                            <Link
                                to={plan.link}
                                className="px-6 py-3 text-xl tracking-wide text-white transition duration-300 bg-indigo-500 rounded-md hover:bg-indigo-600 font-body"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Pricing;
