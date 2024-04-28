import React from 'react'
import {useSelector} from "react-redux";
import "../styles/Sidebar.css"
import {Avatar} from "@mui/material";
import { selectUser } from '../features/userSlice.js';
function Sidebar(){

    const user  = useSelector(selectUser);

    const recentItem = (topic)=>(
        <div className="sidebar__recentItem">
            <span className="sidebar__hash">
                #
            </span>
            <p>
                {topic}
            </p>
        </div>
    );

  return (
    <div>
      <div className="sidebar">
            <div className="sidebar__top">
                <img src="data:image/jpeg;base64,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" alt="image" />
                <Avatar src={user?.photoURL} className="sidebar__avatar">{user.email[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div> 

            <div className="sidebar__stats">
                <div className="sidebar__stat">
                    <p>Who viewed you</p>
                    <p className='sidebar__statNumber'>
                        2,543
                    </p>
                </div>
                <div className="sidebar__stat">
                    <p>Views on post</p>
                    <p className='sidebar__statNumber'>
                        2,448
                    </p>
                </div>
            </div>   

            <div className="sidebar__bottom">
                <p>Recent</p>
                {recentItem('reactJs')}
                {recentItem('programing')}
                {recentItem('Software engg')}
                {recentItem('Software dev')}
            </div> 
      </div>
    </div>
  )
}

export default Sidebar
