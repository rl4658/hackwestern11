import React, { forwardRef } from 'react';

const Input = forwardRef(({ onImport }, ref) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onImport(e.target.result);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => ref.current.click()}
            >
                Import JSON
            </button>
            <input
                type="file"
                ref={ref}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />
        </div>
    );
});

export default Input;
