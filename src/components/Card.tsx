import React from "react";

interface CardProps {
    variant: "light" | "dark";
    heading: string;
    text: string;
    startIcon?: React.ReactElement;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    variant,
    heading,
    text,
    startIcon,
    className,
}) => {
    return (
        <div
            className={`min-h-[370px] max-h-[370px] w-80 p-4 rounded-md ${
                variant === "light"
                    ? "bg-primary-100 text-primary-900"
                    : "bg-primary-600 text-white"
            } ${className ?? ""}`}
        >
            <div className="flex justify-start gap-2 mb-2">
                <div>{startIcon ? startIcon : null}</div>
                <div className="text-lg font-heading">{heading}</div>
            </div>
            <hr />
            <div className="mt-2">{text}</div>
        </div>
    );
};

export default Card;
