import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allnav from '../components/Allnav';

export default function Owneracpt() {
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

    axios.get(`https://rentalsbackend-c5rm.onrender.com/studentacc?ownername=${name}`, {
      headers: {
        'x-access-token': token,
      },
    })
    .then((response) => {
      if (response.data && Array.isArray(response.data)) {
        setEnquiries(response.data);
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
    axios.delete(`https://rentalsbackend-c5rm.onrender.com/api/enquiries/${id}`, {
      headers: {
        'x-access-token': token,
      },
    })
    .then((response) => {
      console.log(response.data);
      fetchEnquiries();
    })
    .catch((error) => {
      console.error('Error cancelling enquiry:', error.message);
    });
  };

  const handleAcceptEnquiry = (id) => {
    const token = localStorage.getItem('token');
    axios.put(`https://rentalsbackend-c5rm.onrender.com/api/enquiries/${id}/accept`, {}, {
      headers: {
        'x-access-token': token,
      },
    })
    .then((response) => {
      console.log(response.data);
      fetchEnquiries();
    })
    .catch((error) => {
      console.error('Error accepting enquiry:', error.message);
    });
  };

  return (
    <div>
      <Allnav />
      <h1 className="text-center text-3xl font-bold my-8">Enquiries</h1>
      <div >
        {enquiries.length > 0 ? (
          <div>
            {enquiries.map((enquiry, index) => (
              <div
                key={index}
                className={`mb-4 ${enquiry.status === 'accepted' ? 'card w-96 bg-orange-200 text-teal-950 shadow-xl mx-auto px-4' : 'card w-96 bg-teal-950 text-orange-200 shadow-xl mx-auto px-4'}`}
              >
                <div className='card-body'>
                    <div className='card-title'>
                        <p>Name: {enquiry.name}</p>
                    </div>
                    <p>Category: {enquiry.category}</p>
                    <p>Contact: {enquiry.contact}</p>
                    <p>Status: {enquiry.status}</p>
                    <div className="card-actions justify-end">
                        <button className='btn w-24 text-xl bg-orange-200 text-teal-950' onClick={() => handleCancelEnquiry(enquiry.id)}>Cancel</button>
                    </div>
                    <div className="card-actions justify-end">
                        <button className='btn w-24 text-xl bg-orange-200 text-teal-950' onClick={() => handleAcceptEnquiry(enquiry.id)}>Accept</button>
                    </div>
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
