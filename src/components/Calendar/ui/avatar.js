import React from "react";

export function Avatar({ children, className = "" }) {
    return (
        <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 ${className}`}
        >
            {children}
        </div>
    );
}

export function AvatarImage({ src, alt, className = "" }) {
    return (
        <img
            src={src}
            alt={alt}
            className={`w-full h-full rounded-full object-cover ${className}`}
        />
    );
}

export function AvatarFallback({ children, className = "" }) {
    return <div className={`text-gray-500 ${className}`}>{children}</div>;
}
