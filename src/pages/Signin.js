import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Loginnav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import '../App.css';
import Modal from 'react-modal';
import './Sig.css'
import logo from '../images/inst.png'
import logo1 from '../images/what.png'
import logo2 from '../images/youtube.png'


export default function Signin() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ mail, password });
    try {
      const response = await axios.post('https://rentalsbackend-c5rm.onrender.com/login', {
        mail: mail,
        password: password,
      });
      if (!response.data.auth) {
        setLoginStatus(false);
        setShowPopup(true);
      } else {
        setLoginStatus(true);
        setModalIsOpen(true);
        const { token, result, owners } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(result));
        localStorage.setItem('ownersData', JSON.stringify(owners));

        setTimeout(() => {
          if (result.category === 'Student') {
            navigate('/student');
          } else if (result.category === 'Owner') {
            navigate('/owner');
          } else if (result.category === 'Normal user') {
            navigate('/normal');
          } else if (result.category === 'Pg') {
            navigate('/pg');
          } else {
            navigate('/login');
          }
          setModalIsOpen(false);
        }, 10000);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error.message);
      setShowPopup(true);
    }
  };
    

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Navbar />
        <div className='flex justify-center text-3xl translate-y-32 font-bold'>
          <p>User Login</p>
        </div>
        <div>
        </div>
        <div className='flex justify-end -ml-2'>
          {showPopup && (
            <Stack>
              <Alert severity="warning" onClose={() => setShowPopup(false)}>
                Error Invalid Credentials Check username and Password
              </Alert>
            </Stack>
          )}
        </div>
        <div className='flex justify-center items-center mt-60'>
          <div className='for w-96 h-96 flex flex-col justify-center items-center bg-teal-950 rounded-2xl'>
            <form>
              <div className='flex justify-center'>
                <TextField
                  type='email'
                  required
                  id="standard-required"
                  label="User Mail"
                  variant="standard"
                  onChange={(e) => setMail(e.target.value)}
                  InputProps={{
                    style: { borderColor: '#fed7aa', color: '#fed7aa' },
                  }}
                  InputLabelProps={{
                    style: { color: '#fed7aa' },
                  }}
                />
              </div>
              <div className='flex justify-center mt-10'>
                <TextField
                  required
                  id="standard-password-input"
                  label="Password"
                  autoComplete="current-password"
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    style: { borderColor: '#fed7aa', color: '#fed7aa' },
                  }}
                  InputLabelProps={{
                    style: { color: '#fed7aa' },
                  }}
                />
              </div>
              <button
                type='button'
                className='font-semibold -translate-y-10 translate-x-44 text-orange-200'
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              <hr className='border-t border-transparent'></hr>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='text-teal-950 font-bold text-xl h-12 w-20 rounded-lg bg-orange-200 hover:bg-orange-100'
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <p className='con text-orange-200 flex justify-center mt-5 gap-2 text-xl mb-2'>
                New user??<Link to='/register' className='text-sky-400'>
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
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
      <div className='flex justify-center items-center'>
          <Modal
            isOpen={modalIsOpen}
            contentLabel="Registration Success Modal"
            ariaHideApp={false}
            className='flex justify-center items-center content-center h-screen w-screen fixed top-0 left-0'
            overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75'
          >
            <div className='lot flex justify-center items-center content-center h-96 w-96 bg-black p-4 rounded-md'>
              <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
                <div class="wheel"></div>
                <div class="hamster">
                  <div class="hamster__body">
                    <div class="hamster__head">
                      <div class="hamster__ear"></div>
                      <div class="hamster__eye"></div>
                      <div class="hamster__nose"></div>
                    </div>
                    <div class="hamster__limb hamster__limb--fr"></div>
                    <div class="hamster__limb hamster__limb--fl"></div>
                    <div class="hamster__limb hamster__limb--br"></div>
                    <div class="hamster__limb hamster__limb--bl"></div>
                    <div class="hamster__tail"></div>
                  </div>
                </div>
                <div class="spoke"></div>
              </div>
            </div>
          </Modal>
        </div>
    </Box>
  );
}
