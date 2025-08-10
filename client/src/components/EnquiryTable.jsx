import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://enquirymodel.onrender.com';

const EnquiryTable = ({ data, getEnquiry, Swal, setFormData, darkMode = false }) => {

    const deleteRow = (delid) => {

        Swal.fire({
            title: "Delete Enquiry?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete!",
            cancelButtonText: "Cancel",
            background: darkMode ? '#1f2937' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            customClass: {
                popup: darkMode ? 'dark-popup' : '',
                title: darkMode ? 'text-white' : '',
                htmlContainer: darkMode ? 'text-gray-300' : ''
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${API_BASE_URL}/api/enquiry/enquiryremove/${delid}`)
                .then((res)=>{
                    toast.success("Enquiry deleted successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: darkMode ? 'dark' : 'light'
                    });
                    getEnquiry();
                })
                .catch((err) => {
                    toast.error("Failed to delete enquiry!", {
                        position: "top-right",
                        autoClose: 3000,
                        theme: darkMode ? 'dark' : 'light'
                    });
                });
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
        <div className={`rounded-2xl shadow-xl border transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700 shadow-gray-900/20' 
            : 'bg-white border-gray-200 shadow-gray-900/10'
        }`}>
          <div className="p-6 lg:p-8">
            {/* Table Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-green-600' : 'bg-green-500'
              }`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Enquiries Table
                </h2>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {data?.length || 0} total enquiries
                </p>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <div className={`overflow-hidden rounded-xl border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <table className={`min-w-full divide-y ${
                  darkMode ? 'divide-gray-700' : 'divide-gray-200'
                }`}>
                  <thead className={`${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        #
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Name
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Email
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Phone
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Message
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider w-40 min-w-[160px] ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
                  }`}>
                    {data && data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={index} className={`hover:${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        } transition-colors duration-150`}>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                            {index + 1}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item.name}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item.email}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item.phone}
                          </td>
                          <td className={`px-6 py-4 text-sm max-w-xs truncate ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`} title={item.message}>
                            {item.message}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm w-40 min-w-[160px]">
                            <div className="flex space-x-1">
                              <button
                                onClick={() => editRow(item._id)}
                                className="inline-flex items-center px-2 py-1.5 text-xs font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 shadow-sm"
                                title="Edit enquiry"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => deleteRow(item._id)}
                                className="inline-flex items-center px-2 py-1.5 text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-150 shadow-sm"
                                title="Delete enquiry"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className={`px-6 py-12 text-center ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <div className="flex flex-col items-center space-y-3">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <p className="text-lg font-medium">No enquiries found</p>
                              <p className="text-sm">Get started by submitting your first enquiry</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <div key={index} className={`rounded-xl border p-4 transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className={`text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editRow(item._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteRow(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>Name: </span>
                        <span className={`text-sm ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{item.name}</span>
                      </div>
                      <div>
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>Email: </span>
                        <span className={`text-sm ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{item.email}</span>
                      </div>
                      <div>
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>Phone: </span>
                        <span className={`text-sm ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{item.phone}</span>
                      </div>
                      <div>
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>Message: </span>
                        <p className={`text-sm mt-1 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{item.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-center py-12 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div className="flex flex-col items-center space-y-3">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-lg font-medium">No enquiries found</p>
                      <p className="text-sm">Get started by submitting your first enquiry</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    );
};

export default EnquiryTable;
