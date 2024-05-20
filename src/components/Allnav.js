import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import menu from '../images/menu.png'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from "@mui/material";
import user from '../images/user.png';
import Logo from '../images/home-heart.png'
import '../App.css'
import Divider from '@mui/material/Divider';

export default function Allnav(){
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
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
        <List className="text-center">
          <ListItem disablePadding className="mb-2">
            <ListItemButton>
              <Link to='/pro' className="text-black text-lg font-semibold">
                {userData && userData.name && (
                  <ListItemText className="text-xl">{userData.name}</ListItemText>
                )}
              </Link>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding className="mb-2">
            <ListItemButton>
              <Link to='/about' className="text-black text-lg font-semibold hover:text-gray-300">
                <ListItemText className="text-xl">About</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem disablePadding className="mb-2">
            <ListItemButton>
              {userData ? (
                <ListItemText className='text-black text-lg font-semibold cursor-pointer hover:text-gray-300' onClick={handleLogout}>
                  Logout
                </ListItemText>
              ) : (
                <Link to="/login" className="text-black text-lg font-semibold hover:text-gray-300" style={{ textDecoration: 'none' }}>
                  <ListItemText className="text-xl">Login</ListItemText>
                </Link>
              )}
            </ListItemButton>
          </ListItem>
          <Divider/>
        </List>
      </Box>
    );
    

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          axios.get(`https://ebackend-1llz.onrender.com/isAuth`, {
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

    return (
        <div className='bg-teal-950 h-24'>
            <img className='w-16 h-16 ml-6 translate-y-3' alt='logo' src={Logo}/>
            <div className='flex justify-center -translate-y-10'>
                <p className='text-orange-200 text-center text-4xl font-bold'>Easy Houses!!</p>
            </div>
            <div className="flex justify-end -translate-y-20">
                <div className="flex justify-center -translate-x-3 -translate-y-2 border-2 rounded-full w-16 h-16 border-orange-200">
                    <img className="w-10 h-10 flex justify-center translate-y-2" src={user} alt='user'/>
                </div>
                <div className="translate-y-2">
                    {userData && userData.name && (
                    <p className="text-2xl font-semibold text-orange-200">{userData.name}</p>
                    )}
                </div>
                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)} className="w-8">
                                <img className='men w-8 -translate-y-2' alt="menu" src={menu} />
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
    );
}