import React, { useState } from 'react';
import axios from 'axios';
import Allnav from '../components/Allnav';
import '../App.css';

export default function Owner() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    area: '',
    state: '',
    country: '',
    category: '',
    hall: null,
    kitchen: null,
    bedroomone: null,
    toiletone: null,
    bedroomtwo: null,
    toilettwo: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const fileInputName = e.target.name;
    const file = e.target.files[0];

    setFormData(prevFormData => ({
      ...prevFormData,
      [fileInputName]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key], formData[key].name);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    try {
      const response = await axios.post('https://ebackend-1llz.onrender.com/owner', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setFormData({
        name: '',
        contact: '',
        address: '',
        area: '',
        state: '',
        country: '',
        category: '',
        hall: null,
        kitchen: null,
        bedroomone: null,
        toiletone: null,
        bedroomtwo: null,
        toilettwo: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Allnav />
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleSubmit} className="w-1/2">
        <div className='grid grid-cols-12 gap-x-6 gap-y-8 sm:grid-col-12'>
          <div className='sm:col-span-6'>
            <label htmlFor="name" className="block text-xl font-medium leading-6 text-black">Name</label>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">Contact</label>
            <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">Address</label>
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">Area</label>
            <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">State</label>
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>  
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">Country</label>
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <div className='sm:col-span-full'>
            <label className="block text-xl font-medium leading-6 text-black">Select the people category whom you want to rent the house</label>
            <select name="category" value={formData.category} onChange={handleChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required>
              <option value="">Select Category</option>
              <option value="Student">Student</option>
              <option value="Pg">Pg</option>
              <option value="Normal User">Normal User</option>
              <option value="Owner">Owner</option>
            </select><br />
          </div>
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">Image of Hall(Required*)</label>
            <input type="file" name="hall" onChange={handleFileChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">Image of Kitchen(Required*)</label>
            <input type="file" name="kitchen" onChange={handleFileChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>  
          <div className='sm:col-span-6'> 
            <label className="block text-xl font-medium leading-6 text-black">Image of Bedroom</label>
            <input type="file" name="bedroomone" onChange={handleFileChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <div className='sm:col-span-6'>
            <label className="block text-xl font-medium leading-6 text-black">Image of Washroom</label>
            <input type="file" name="toiletone" onChange={handleFileChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>  
          <div className='sm:col-span-6'>  
            <label className="block text-xl font-medium leading-6 text-black">Additional image of bedroom if any</label>
            <input type="file" name="bedroomtwo" onChange={handleFileChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>  
          <div className='sm:col-span-6'>  
            <label className="block text-xl font-medium leading-6 text-black">Additional image of washroom if any</label>
            <input type="file" name="toilettwo" onChange={handleFileChange} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" required /><br />
          </div>
          <button type="submit" className="btn bg-orange-200 text-teal-950 font-bold w-24">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
