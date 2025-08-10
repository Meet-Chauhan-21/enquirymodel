import React, { useEffect, useState } from 'react'
import EnquiryTable from './EnquiryTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'

const API_BASE_URL = 'https://enquirymodel.onrender.com';

const Enquiry = () => {
  
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
                toast.success("✅ Enquiry updated successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
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

          }else{
            
              axios.post(`${API_BASE_URL}/api/enquiry/enquiryinsert`, formData)
              .then((res) => {
          
                console.log(res.data);
                toast.success("🎉 Enquiry saved successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                })
          
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
                toast.error("❌ Failed to save enquiry. Please try again.", {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
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

      const clearForm = () => {
        setFormData({
          name:'',
          email:'',
          phone:'',
          message:'',
          _id:''
        });
        toast.info("🧹 Form cleared successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }  


      useEffect(()=>{
          getEnquiry();
      },[])

  return (
    <div className='min-h-screen p-4 lg:p-6 overflow-hidden'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
      <div className='max-w-full mx-auto h-full flex flex-col'>
        <div className='text-center mb-6 flex-shrink-0'>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2'>📋 Enquiry Management System</h1>
          <p className='text-gray-600 dark:text-gray-300 text-base lg:text-lg'>Manage customer enquiries efficiently</p>
        </div>

        <div className='flex-1 grid lg:grid-cols-[380px_1fr] grid-cols-1 gap-6 lg:gap-8 min-h-0'>
          <div className='bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col max-h-full overflow-hidden'>
            <div className='flex items-center mb-6'>
              <div className='bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4'>
                <svg className='w-6 h-6 text-blue-600 dark:text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                </svg>
              </div>
              <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>New Enquiry</h2>
            </div>
          
          <form action="" onSubmit={saveEnquiry} className='flex-1 flex flex-col'>
          
              <div className='flex-1 space-y-4 overflow-y-auto pr-2'>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">👤 Full Name</label>
                <input
                  value={formData.name}
                  onChange={getData}
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-5">📧 Email Address</label>
                <input
                  value={formData.email}
                  onChange={getData}
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-5">📱 Phone Number</label>
                <input
                  value={formData.phone}
                  onChange={getData}
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 123-4567"
                  className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-5">💬 Message</label>
                <textarea
                  value={formData.message}
                  onChange={getData}
                  name="message"
                  rows="4"
                  required
                  placeholder="Please describe your enquiry in detail..."
                  className="w-full border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500 resize-none"
                ></textarea>
              </div>

              </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 flex-shrink-0">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {formData._id ? '✏️ Update Enquiry' : '📝 Submit Enquiry'}
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="sm:w-auto w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  🧹 Clear Form
                </button>
              </div>
          
          </form>

          </div>
          <EnquiryTable 
            data={enquiryList} 
            getEnquiry={getEnquiry}
            Swal={Swal}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  )
}

export default Enquiry