import React, { useEffect, useState } from 'react'
import EnquiryTable from './EnquiryTable';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'

const API_BASE_URL = process.env.REACT_APP_URL;

const Enquiry = () => {

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
                toast.success("Enquiry Update Successfully.!");
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
                toast.success("Enquiry saved successfully!")
          
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
                alert("Failed to save enquiry.");
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
    <div className='ml-[-70px]'>
      <ToastContainer/>
      <h1 className='font-bold p-5 text-[30px]'>User Enquiry</h1>

      <div className='grid grid-cols-[30%_auto] gap-10'>
        <div className='bg-gray-200 py-5 px-8 rounded-2xl'>
          <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
          
          <form action="" onSubmit={saveEnquiry}>
          
              <div className='mt-6'>
                <label className="ml-3 text-left block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  value={formData.name}
                  onChange={getData}
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label  className="ml-3 mt-3 text-left block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  value={formData.email}
                  onChange={getData}
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label  className="ml-3 mt-3 text-left block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  value={formData.phone}
                  onChange={getData}
                  type="tel"
                  name="phone"
                  required
                  placeholder="123-456-7890"
                  className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label  className="ml-3 mt-3 text-left block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={formData.message}
                  onChange={getData}
                  name="message"
                  rows="3"
                  required
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                {formData._id ? 'Update' : 'Save'}
              </button>
          
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
  )
}

export default Enquiry