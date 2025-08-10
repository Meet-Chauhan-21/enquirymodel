import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

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
                toast.success("Enquiry Delete Successfully.!");
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
        <div>

            <ToastContainer></ToastContainer>
        <div className='grid grid-cols-[110%_auto] gap-10'>
            <div className='bg-gray-200 py-5 px-8 rounded-2xl'>
                <h2 className="text-[20px] font-bold mb-4">Enquiries Table</h2>
                <div className="overflow-x-auto rounded-lg shadow overflow-hidden">
                    <table className="min-w-full text-left text-sm bg-white">
                        <thead className="bg-gray-300 text-gray-700">
                            <tr>
                                <th className="px-4 py-2">No.</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Message</th>
                                <th className="px-4 py-2">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2">{item.email}</td>
                                        <td className="px-4 py-2">{item.phone}</td>
                                        <td className="px-4 py-2">{item.message}</td>
                                        <td className="px-4 py-2 space-x-2">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition duration-200"
                                                onClick={()=>editRow(item._id)}
                                                >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition duration-200"
                                                onClick={()=>deleteRow(item._id)}
                                                >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="border-t">
                                    <td colSpan="6" className="px-4 py-2 text-center font-bold">
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                            </div>
    );
};

export default EnquiryTable;
