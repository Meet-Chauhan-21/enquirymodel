import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import EnquiryCard from './EnquiryCard';

const API_BASE_URL = 'https://enquirymodel.onrender.com';


const EnquiryTable = ({ data,getEnquiry,Swal,setFormData}) => {

    const deleteRow = (delid) => {

        Swal.fire({
        title: "Do you want to Delete Data ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            axios.delete(`${API_BASE_URL}/api/enquiry/enquiryremove/${delid}`)
            .then((res)=>{
                toast.success("🗑️ Enquiry deleted successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
                getEnquiry();
            })
            
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
        });

    }

    const editRow = (editId) => {
        axios.get(`${API_BASE_URL}/api/enquiry/enquiryedit/${editId}`)
        .then((res) => {
            let data = res.data.enquiry;
            setFormData(data); // ✅ Correct usage
        })
        .catch((err) => {
            console.error("Error fetching enquiry:", err);
        });
    };



    return (
        <div className='bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-4 md:p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300'>
            <div className='flex items-center justify-between mb-6 flex-wrap gap-4'>
                <div className='flex items-center'>
                    <div className='bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4'>
                        <svg className='w-6 h-6 text-green-600 dark:text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
                        </svg>
                    </div>
                    <h2 className='text-xl md:text-2xl font-bold text-gray-800 dark:text-white'>📊 Enquiries Database</h2>
                </div>
                <div className='text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full'>
                    Total: {data ? data.length : 0} enquiries
                </div>
            </div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600">
                <table className="min-w-full text-left text-sm bg-white dark:bg-gray-800">
                    <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-center w-16">#</th>
                            <th className="px-6 py-4 font-semibold min-w-[150px]">👤 Name</th>
                            <th className="px-6 py-4 font-semibold min-w-[200px]">📧 Email</th>
                            <th className="px-6 py-4 font-semibold min-w-[150px]">📱 Phone</th>
                            <th className="px-6 py-4 font-semibold min-w-[250px]">💬 Message</th>
                            <th className="px-6 py-4 font-semibold text-center min-w-[160px]">⚙️ Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                    <td className="px-6 py-4 text-blue-600 dark:text-blue-400">{item.email}</td>
                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{item.phone}</td>
                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 max-w-xs">
                                        <div className="truncate" title={item.message}>{item.message}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                                onClick={()=>editRow(item._id)}
                                                title="Edit this enquiry"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                                onClick={()=>deleteRow(item._id)}
                                                title="Delete this enquiry"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                                            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">📭 No enquiries found</p>
                                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start by submitting your first enquiry!</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
                {data && data.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {data.map((item, index) => (
                            <EnquiryCard 
                                key={index}
                                item={item}
                                index={index}
                                editRow={editRow}
                                deleteRow={deleteRow}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">📭 No enquiries found</p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start by submitting your first enquiry!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnquiryTable;
