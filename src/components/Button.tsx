import React from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "info";
    size: "sm" | "md" | "lg";
    rounded?: "sm" | "md" | "lg" | "full";
    text: string;
    startIcon?: React.ReactElement;
    endIcon?: React.ReactElement;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant,
    size,
    rounded,
    text,
    startIcon,
    endIcon,
    onClick,
    className,
}) => {
    const variantStyle = {
        primary: "bg-primary-100 text-primary-500",
        secondary: "bg-secondary",
        info: "bg-info text-black",
    };

    const sizeStyle = {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-3 text-base",
        lg: "py-3 px-6 text-lg ",
    };

    const iconSize = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const roundedStyles = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
    };

    return (
        <button
            className={`flex items-center gap-3 rounded w-max  ${
                variantStyle[variant]
            } ${sizeStyle[size]} ${
                rounded && roundedStyles[rounded]
            } ${className}`}
            onClick={onClick}
        >
            {startIcon &&
                React.cloneElement(startIcon, {
                    className: `${iconSize[size]}`,
                })}
            <span>{text}</span>
            {endIcon &&
                React.cloneElement(endIcon, {
                    className: `${iconSize[size]}`,
                })}
        </button>
    );
};

export default Button;
