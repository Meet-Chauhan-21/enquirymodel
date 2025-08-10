import React from 'react';

const EnquiryCard = ({ item, index, editRow, deleteRow }) => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            {/* Header with index */}
            <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">
                    #{index + 1}
                </div>
                <div className="flex gap-2">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        onClick={() => editRow(item._id)}
                        title="Edit this enquiry"
                    >
                        ✏️
                    </button>
                    <button
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        onClick={() => deleteRow(item._id)}
                        title="Delete this enquiry"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">👤 Name</label>
                    <p className="text-gray-900 dark:text-white font-semibold text-lg">{item.name}</p>
                </div>
                
                <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">📧 Email</label>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{item.email}</p>
                </div>
                
                <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">📱 Phone</label>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{item.phone}</p>
                </div>
                
                <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">💬 Message</label>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.message}</p>
                </div>
            </div>
        </div>
    );
};

export default EnquiryCard;
