import React, { useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import Lottie from 'lottie-react';
import Animation from './animation.json';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snav from '../components/Signupnav';
import '../App.css';

export default function Register() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [area, setArea] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const addUser = (e) => {
    e.preventDefault();
    if (!name || !contact || !mail || !address || !password || !cpassword || !area || !state || !country || !category) {
      setValidationMessage("Please fill in all details");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setValidationMessage("Password must have: \n- The first letter as a capital letter\n- At least one digit\n- At least one of the special characters @ or #\n- Minimum 8 characters in total");
      return false;
    }

    if (!mail.endsWith('@gmail.com')) {
      setValidationMessage("Invalid email format. Please use @gmail.com");
      return;
    }

    if (password !== cpassword) {
      setValidationMessage("Password and Confirm Password do not match");
      return;
    }

    Axios.post(`https://rentalsbackend-c5rm.onrender.com/register`, {
      name: name,
      contact: contact,
      mail: mail,
      address: address,
      area: area,
      state: state,
      country: country,
      category: category,
      password: password,
      cpassword: cpassword,
    })
      .then(() => {
        console.log("Success");
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <Snav />
      <div className='flex justify-end mt-8'>
        {validationMessage && (
          <>
            <Stack className='relative'>
              <Alert severity="warning" onClose={() => setValidationMessage('')}>
                {validationMessage}
              </Alert>
            </Stack>
            {window.scrollTo({ top: 0, behavior: 'smooth' })}
          </>
        )}
      </div>
      <div className="border-b border-gray-900/10 p-5 flex justify-center items-center">
        <form className='h-1/2 rounded-xl w-1/2'>
          <div className="mt-10 grid p-2 grid-cols-12 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div className="sm:col-span-6">
              <label htmlFor="name" className="block text-xl font-medium leading-6 text-black">Name</label>
              <div className="mt-2">
                <input type="text" onChange={(e) => setName(e.target.value)} id="name" maxLength={20} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-xl font-medium leading-6 text-black">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" onChange={(e) => setMail(e.target.value)} autoComplete="email" maxLength={30} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="contact" className="block text-xl font-medium leading-6 text-black">Contact Number</label>
              <div className="mt-2">
                <input id="contact" name="contact" type="tel" onChange={(e) => setContact(e.target.value)} autoComplete="tel" maxLength={30} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="area" className="block text-xl font-medium leading-6 text-black">Area</label>
              <div className="mt-2">
                <input id="area" name="area" type="text" onChange={(e) => setArea(e.target.value)} maxLength={30} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="state" className="block text-xl font-medium leading-6 text-black">State</label>
              <div className="mt-2">
                <input id="state" name="state" type="text" onChange={(e) => setState(e.target.value)} maxLength={30} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="country" className="block text-xl font-medium leading-6 text-black">Country</label>
              <div className="mt-2">
                <input id="country" name="country" type="text" onChange={(e) => setCountry(e.target.value)} maxLength={30} className="block w-full text-center rounded-md border-0 py-1.5 text-balck shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="category" className="block text-xl font-medium leading-6 text-black">Category</label>
              <div className="mt-2">
                <select id="category" name="category" onChange={(e) => setCategory(e.target.value)} value={category} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6">
                  <option value="Select">Select</option>
                  <option value="Student">Student</option>
                  <option value="Pg">Pg</option>
                  <option value="Normal User">Normal user</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-xl font-medium leading-6 text-black">Home Address</label>
              <div className="mt-2">
                <textarea type="text" name="address" onChange={(e) => setAddress(e.target.value)} id="address" autoComplete="street-address" maxLength={100} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="password" className="block text-xl font-medium leading-6 text-black">Password</label>
              <div className="mt-2">
                <input id="password" name="password" type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" maxLength={9} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
                <button className='text-teal-950' type="button" onClick={handleTogglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
                <p className='font-bold'>Pasword must be of length of 8 characters <p>Should contain atleast one special character @,$,etc</p><p>Should contain alteast one number 0-9</p><p>First letter should not be number and should be of capital letter</p></p>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="cpassword" className="block text-xl font-medium leading-6 text-black">Confirm Password</label>
              <div className="mt-2">
                <input id="cpassword" name="cpassword" type={showConfirmPassword ? "text" : "password"} onChange={(e) => setCpassword(e.target.value)} autoComplete="new-password" maxLength={9} className="block w-full text-center rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-teal-950 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-900 sm:text-sm sm:leading-6" />
                <button className='text-teal-950' type="button" onClick={handleToggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button onClick={addUser} type="submit" className="rounded-md bg-orange-200 px-3 py-2 text-sm font-semibold text-teal-950 shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Register</button>
          </div>
        </form>
      </div>

      <div className='flex justify-center items-center'>
          <Modal
            isOpen={modalIsOpen}
            contentLabel="Registration Success Modal"
            ariaHideApp={false}
            className='flex justify-center items-center content-center h-screen w-screen fixed top-0 left-0'
            overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75'
          >
            <div className='lot flex justify-center items-center content-center h-96 w-96 bg-white p-4 rounded-md'>
              <Lottie
                animationData={Animation}
                loop={false}
                autoplay={true}
                className="lot"
                style={{ width: 400, height: 400, flex:1,justifyContent:'center', alignItems:'center'}}
              />
              
            </div>
            <Link to='/login'>
              <button onClick={closeModal} className='close bg-red-500 w-16 h-16 -translate-y-56 text-white rounded-full font-black'>
                  X
              </button>
            </Link>
          </Modal>
        </div>
    </div>
  );
}
