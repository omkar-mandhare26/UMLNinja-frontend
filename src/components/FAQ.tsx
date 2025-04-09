"use client";

import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

const faqItems = [
    {
        question: "What is UMLNinja?",
        answer: "UMLNinja is a powerful diagramming tool designed to help users create, export, and share UML diagrams easily. Whether you're a beginner or a seasoned professional, our platform offers plans that cater to your needs—from basic usage to advanced professional features.",
    },
    {
        question: "What do the credits mean in each plan?",
        answer: "Credits are the currency you use within UMLNinja to create and export diagrams. The Free plan gives you 5 credits to get started, while the Pro and Professional plans provide 100 and 250 credits, respectively, allowing for more extensive usage.",
    },
    {
        question: `What does Cloud Storage mean in this context?`,
        answer: "Cloud Storage allows you to securely save your projects online. This ensures your work is backed up, easily accessible from any device, and ready for quick sharing or collaboration.",
    },
    {
        question: "What is PlantUML Code and why might I need it?",
        answer: "PlantUML Code is a text-based description language for creating UML diagrams. This feature is included in the Professional plan and is ideal for users who prefer or require more technical, code-driven diagram creation. It enables seamless integration with development workflows and version control systems.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We offer UPI payments and also bank transfer",
    },
    {
        question: "Will my subscription renew automatically?",
        answer: "No, we currently do not offer auto-renewal. You will need to manually purchase a new plan when your credits are exhausted.",
    },
    {
        question: "Can I get a refund after purchasing a plan?",
        answer: "No, all purchases are final. Since UMLNinja provides digital services and credits, we do not offer refunds once a plan is purchased. However, if you experience any issues, please contact our support team, and we will do our best to assist you.",
    },
    {
        question: "Can I transfer my credits to another account?",
        answer: "No, credits are non-transferable and can only be used by the account that purchased them.",
    },
];

const FAQ = () => {
    return (
        <div className="min-h-screen p-8 bg-background">
            <div className="max-w-3xl mx-auto mb-8">
                <h1 className="mb-4 text-3xl font-bold text-white font-heading">
                    Frequently Asked Questions
                </h1>
                <p className="text-primary-300">
                    Find answers to common questions about our platform and
                    services.
                </p>
            </div>
            <FAQComp items={faqItems} />
        </div>
    );
};

function FAQComp({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4 font-body">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="overflow-hidden border rounded-lg border-primary-400 bg-primary-500"
                >
                    <button
                        onClick={() => toggleQuestion(index)}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-300 ${
                            openIndex === index
                                ? "bg-primary-hover"
                                : "hover:bg-primary-hover"
                        }`}
                        aria-expanded={openIndex === index}
                    >
                        <span className="text-lg font-medium font-heading">
                            {item.question}
                        </span>
                        <ChevronDown
                            className={`w-5 h-5 text-primary-300 transition-transform duration-300 ${
                                openIndex === index ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            openIndex === index ? "max-h-96" : "max-h-0"
                        }`}
                    >
                        <div className="px-6 py-4 bg-primary-600 text-primary-200">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FAQ;
