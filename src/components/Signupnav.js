import React from 'react'
import '../App.css'
import Logo from '../images/home-heart.png'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {ListItemText} from '@mui/material';
import menu from '../images/menu.png' 
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

export default function Signupnav() {
    const [state,setState]=React.useState({
        bottom:false
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
                    <ListItem>
                        <Link to='/' >
                            <ListItemText>
                                Home
                            </ListItemText>
                        </Link>
                    </ListItem>
                </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding style={{ marginRight: '10px' }}>
                <ListItemButton>
                    <ListItem>
                        <Link to='/login' >
                            <ListItemText>
                                Login
                            </ListItemText>
                        </Link>
                    </ListItem>
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
                      {list(anchor)}
                  </Drawer>
              </React.Fragment>
          ))}
        </div>
    </div>
  )
}
