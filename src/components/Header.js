import React from 'react';
import {useDispatch} from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"; 
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from "@mui/icons-material/Notifications";
import '../styles/Header.css';
import HeaderOptions from '../components/HeaderOptions.js';
import { auth } from '../firebase.js';
import { logout } from '../features/userSlice.js';
function Header() {


  const dispatch = useDispatch();

  const logoutOfApp = ()=>{
    dispatch(logout())
    auth.signOut();
  }
  return (
    <div className='header'>
        <div className='header_left'>
            <img src='https://cdn-icons-png.flaticon.com/128/3536/3536505.png' alt='linkedin icon'/>

            <div className='header_search'>
              {/* search icon */}
              <SearchIcon/>
              <input placeholder='Search...' type='text'/>
            </div>
        </div>
        <div className='header_right'> 
            <HeaderOptions Icon={HomeIcon} title="Home"/>
            <HeaderOptions Icon={SupervisorAccountIcon} title="My Network"/>
            <HeaderOptions Icon={BusinessCenterIcon} title="Jobs"/>
            <HeaderOptions Icon={ChatIcon} title="Chat" />
            <HeaderOptions Icon={NotificationsIcon} title="Notification"/>
            <HeaderOptions 
              avatar={true}
              title="Logout"
              logoutOfApp={logoutOfApp}/>
        </div>
        

    </div>
  )
}

export default Header;
