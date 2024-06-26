import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Allnav from '../components/Allnav';
import logo from '../images/inst.png'
import logo1 from '../images/what.png'
import logo2 from '../images/youtube.png'

export default function Pgaccept() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
    const intervalId = setInterval(fetchEnquiries, 5000);
    return () => clearInterval(intervalId);
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

    axios.get(`https://rentalsbackend-c5rm.onrender.com/studentaccept?name=${name}`, {
      headers: {
        'x-access-token': token,
      },
    })
    .then((response) => {
      if (response.data && Array.isArray(response.data)) {
        const filteredEnquiries = response.data.filter(enquiry => enquiry.name === name);
        setEnquiries(filteredEnquiries);
      } else {
        console.error('Invalid response from the server');
      }
    })
    .catch((error) => {
      console.error('Error fetching enquiries:', error.message);
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
                    <p>Owner Name: {enquiry.ownername}</p>
                    <p>Owner Contact: {enquiry.ownercontact}</p>
                    <p>Status: {enquiry.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No enquiries found</p>
        )}
      </div>
      <footer className="footer footer-center p-10 bg-orange-200 text-teal-950 font-semibold rounded">
        <nav className="grid grid-flow-col gap-4">
          <p className="link link-hover">About us</p>
          <p className="link link-hover">Contact</p>
        </nav> 
        <nav>
          <div className="grid grid-flow-col gap-4">
            <button><img src={logo} alt='logo'/></button>
            <button><img src={logo1} alt='logo'/></button>
            <button><img src={logo2} alt='logo'/></button>
          </div>
        </nav> 
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
}
