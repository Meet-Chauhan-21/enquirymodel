import React from 'react';

const EnquiryCard = ({ item, index, editRow, deleteRow }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            {/* Header with index */}
            <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
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
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">👤 Name</label>
                    <p className="text-gray-900 font-semibold text-lg">{item.name}</p>
                </div>
                
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">📧 Email</label>
                    <p className="text-blue-600 font-medium">{item.email}</p>
                </div>
                
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">📱 Phone</label>
                    <p className="text-gray-700 font-medium">{item.phone}</p>
                </div>
                
                <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">💬 Message</label>
                    <p className="text-gray-700 leading-relaxed">{item.message}</p>
                </div>
            </div>
        </div>
    );
};

export default EnquiryCard;
