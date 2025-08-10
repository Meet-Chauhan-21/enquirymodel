import React, { useEffect, useState } from 'react'
import EnquiryTable from './EnquiryTable';
import { toast } from 'react-toastify';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'

const API_BASE_URL = 'https://enquirymodel.onrender.com';

const Enquiry = ({ darkMode = false }) => {
  
  // Debug logging
  console.log('Environment variable REACT_APP_URL:', process.env.REACT_APP_URL);
  console.log('Final API_BASE_URL:', API_BASE_URL);

  const [enquiryList, setEnquiryList] = useState([]);

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    message:'',
    _id:''
  });

  const saveEnquiry = (e)=>{
    e.preventDefault();
    console.log("Enquiry Saved.");
    // let formData = {
    //   name: e.target.name.value,
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   message: e.target.message.value
    // }

          if(formData._id){
              axios.put(`${API_BASE_URL}/api/enquiry/enquiryupdate/${formData._id}`,formData)
              .then((res)=>{
                toast.success("Enquiry updated successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: darkMode ? 'dark' : 'light'
                });
                setFormData({
                  name:'',
                  email:'',
                  phone:'',
                  message:'',
                  _id:''
                })
                getEnquiry(); 
              })
              .catch((err) => {
                toast.error("Failed to update enquiry!", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: darkMode ? 'dark' : 'light'
                });
              })

          }else{
            
              axios.post(`${API_BASE_URL}/api/enquiry/enquiryinsert`, formData)
              .then((res) => {
          
                console.log(res.data);
                toast.success("Enquiry submitted successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: darkMode ? 'dark' : 'light'
                });
          
                  setFormData({
                    name:'',
                    email:'',
                    phone:'',
                    message:''
                  })
                  getEnquiry();
          
              })
              .catch((err) => {
                console.error("Error saving enquiry:", err);
                toast.error("Failed to save enquiry!", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: darkMode ? 'dark' : 'light'
                });
              });
          }

      }

      const getEnquiry = () => {
        axios.get(`${API_BASE_URL}/api/enquiry/enquirylist`)

        .then((res)=>{
          return res.data
        })
        .then((finalData) => {
          if (finalData.status) {
            setEnquiryList(finalData.enquiry);
          }
        })

      }


      const getData = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let oldData = {...formData};

        oldData[inputName] = inputValue;
        setFormData(oldData);
      }  


      useEffect(()=>{
          getEnquiry();
      },[])

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          User Enquiry Management
        </h1>
        <p className={`text-lg ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Manage and track customer enquiries efficiently
        </p>
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 lg:gap-8">
        {/* Enquiry Form */}
        <div className={`rounded-2xl shadow-xl border transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700 shadow-gray-900/20' 
            : 'bg-white border-gray-200 shadow-gray-900/10'
        }`}>
          <div className="p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Enquiry Form
              </h2>
            </div>
            
            <form onSubmit={saveEnquiry} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Full Name *
                </label>
                <input
                  value={formData.name}
                  onChange={getData}
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                  }`}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Email Address *
                </label>
                <input
                  value={formData.email}
                  onChange={getData}
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                  }`}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Phone Number *
                </label>
                <input
                  value={formData.phone}
                  onChange={getData}
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                  }`}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={getData}
                  name="message"
                  rows="4"
                  required
                  placeholder="Please describe your enquiry in detail..."
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-400 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={formData._id ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                  </svg>
                  <span>{formData._id ? 'Update Enquiry' : 'Submit Enquiry'}</span>
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Enquiry Table */}
        <div className="min-w-0"> {/* min-w-0 prevents overflow issues */}
          <EnquiryTable 
            data={enquiryList} 
            getEnquiry={getEnquiry}
            Swal={Swal}
            setFormData={setFormData}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  )
}

export default Enquiry