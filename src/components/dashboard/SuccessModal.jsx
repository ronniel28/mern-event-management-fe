import React from 'react';

const SuccessModal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Success</h2>
                <p>{message}</p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;