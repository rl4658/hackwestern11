import React from "react";

export function Dialog({ children, open, onOpenChange }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded shadow-lg w-96 p-4">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => onOpenChange(false)}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}

export function DialogContent({ children }) {
    return <div className="mt-4">{children}</div>;
}

export function DialogHeader({ children }) {
    return <div className="text-lg font-semibold">{children}</div>;
}

export function DialogTitle({ children }) {
    return <h2 className="text-xl font-bold">{children}</h2>;
}

export function DialogFooter({ children }) {
    return <div className="mt-4 flex justify-end space-x-2">{children}</div>;
}
