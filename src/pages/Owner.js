import React, { useState } from 'react';
import axios from 'axios';

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
      // Reset form after successful submission
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
      <h2>Add Owner</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required /><br />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required /><br />
        <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} required /><br />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required /><br />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required /><br />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required /><br />
        <input type="file" name="hall" onChange={handleFileChange} required /><br />
        <input type="file" name="kitchen" onChange={handleFileChange} required /><br />
        <input type="file" name="bedroomone" onChange={handleFileChange} required /><br />
        <input type="file" name="toiletone" onChange={handleFileChange} required /><br />
        <input type="file" name="bedroomtwo" onChange={handleFileChange} required /><br />
        <input type="file" name="toilettwo" onChange={handleFileChange} required /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
