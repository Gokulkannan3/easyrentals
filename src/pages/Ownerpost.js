import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allnav from '../components/Allnav';

export default function Ownerpost() {
    const [enquiries, setEnquiries] = useState([]);
    
    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = () => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');
        if (!token || !storedUserData) {
          console.error('Token or user data not found in local storage');
          return;
        }
        
        const userData = JSON.parse(storedUserData);
        const { name } = userData;
    
        axios.get(`https://rentalsbackend-c5rm.onrender.com/own/${name}`, {
          headers: {
            'x-access-token': token,
          },
        })
        .then((response) => {
          if (response.data && response.data.owners) {
            setEnquiries(response.data.owners);
          } else {
            console.error('Invalid response from the server');
          }
        })
        .catch((error) => {
          console.error('Error fetching enquiries:', error.message);
        });
    };

    const handleCancelEnquiry = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`https://rentalsbackend-c5rm.onrender.com/own/${id}`, {
          headers: {
            'x-access-token': token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting enquiry:', error.message);
        });
    };

    return (
        <div>
            <Allnav />
            <h1 className="text-center text-3xl font-bold my-8">My Posts</h1>
            <div>
                {enquiries.length > 0 ? (
                    <div className='card w-96 bg-orange-200 text-teal-950 shadow-xl mx-auto px-4'>
                        {enquiries.map((enquiry, index) => (
                            <div className='card-body' key={index}>
                                <div className='card-title'>
                                    <p>Owner Name: {enquiry.name}</p>
                                </div>
                                <p>Address: {enquiry.address}</p>
                                <p>Category: {enquiry.category}</p>
                                <p>Contact: {enquiry.contact}</p>
                                <p>Rent Amount: Rs.{enquiry.amount}</p>
                                <div className="card-actions justify-end">
                                    <button className='btn w-24 text-xl bg-orange-200 text-teal-950 border-teal-950 hover:bg-teal-950 hover:text-orange-200' onClick={() => handleCancelEnquiry(enquiry.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No enquiries found</p>
                )}
            </div>
        </div>
    );
}
