import React from "react";

export default function Button({
    children,
    className = "",
    variant = "default",
    size = "md",
    ...props
}) {
    const baseStyle = "px-4 py-2 font-semibold rounded";
    const variants = {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
        destructive: "bg-red-500 text-white hover:bg-red-600",
    };
    const sizes = {
        sm: "text-sm px-2 py-1",
        md: "text-md px-4 py-2",
        lg: "text-lg px-6 py-3",
        icon: "p-2",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
