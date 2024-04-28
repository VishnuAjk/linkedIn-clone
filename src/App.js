import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { login, logout, selectUser } from './features/userSlice.js';
import './App.css';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import Feed from './pages/Feed.js';
import Login from './pages/Login.js';
import Widgets from './components/Widgets.js';
import { auth } from './firebase.js';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    //This is a Listener, which listens to any authentication change, which means persisted authentication
    //if we dont do this, if we refresh after login,we will be logedout to login page
    auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
       dispatch(login({
          email:userAuth.email,
          uid:userAuth.uid,
          displayName: userAuth.displayName,
          photoURL:userAuth.photoURL
       }))
      }
      else{
        dispatch(logout());
      }
    })    
  },[]);

  return (
    <div className="app">
      {/* Header */}
      <Header/>
      {!user ?(
      <Login/>
    ):(
      <div className="app__body"> 
        <Sidebar/>
        <Feed/>
        <Widgets/>
      </div>     
    )
  }
      

    </div>
  );
}

export default App;
