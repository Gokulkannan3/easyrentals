import React from 'react'
import '../App.css'
import Logo from '../images/home-heart.png'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {ListItemText} from '@mui/material';
import menu from '../images/menu.png' 
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from "axios";

export default function Loginnav() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      axios.get(`http://localhost:3002/isAuth`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        }
      })
        .then((response) => {
          console.log(response.data);

          if (response.data.result && response.data.result.length > 0) {
            const userData = response.data.result[0];
            setUserData(userData);
            localStorage.setItem("userData", JSON.stringify(userData));
          } else {
            console.error('No user details found in the response');
          }
        })
        .catch((error) => {
          console.error('An unexpected error occurred:', error.message);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    navigate('/');
  };
  const [state, setState] = React.useState({
    bottom: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding style={{ marginRight: '10px' }}>
            <ListItemButton>
                <Link to='/pro'>
                    {userData && userData.firstname && (
                      <ListItemText className="text-xl">{userData.username}</ListItemText>
                    )}
                </Link>
            </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding style={{ marginRight: '10px' }}>
            <ListItemButton>
                <Link to='/'>
                      <ListItemText className="text-xl">Home</ListItemText>
                </Link>
            </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding style={{ marginRight: '10px' }}>
            <ListItemButton>
                <Link to='/register'>
                      <ListItemText className="text-xl">Sign up</ListItemText>
                </Link>
            </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding style={{ marginRight: '10px' }}>
            <ListItemButton>
                {userData ? (
                    <ListItemText className='font-bold text-lg' onClick={handleLogout}>
                        Logout
                    </ListItemText>
                ) : (
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemText className='font-bold text-xl'>
                            Login
                        </ListItemText>
                    </Link>
                )}
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='bg-teal-950 h-24'>
        <img className='w-16 h-16 ml-6 translate-y-3'alt='logo' src={Logo}/>
      <div className='flex justify-center -translate-y-10'>
        <p className='text-orange-200 text-center text-4xl font-bold'>Easy Rentals!!</p>
      </div>
      <div className="flex justify-end -translate-y-20">
          {['right'].map((anchor) => (
              <React.Fragment key={anchor}>
                  <Button onClick={toggleDrawer(anchor, true)} className="w-8">
                          <img className='men w-8 ' alt="menu" src={menu} />
                  </Button>
                  <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                  >
                      {list(anchor, userData)}
                  </Drawer>
              </React.Fragment>
          ))}
        </div>
    </div>
  )
}
