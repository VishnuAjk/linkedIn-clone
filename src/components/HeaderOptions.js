import React from 'react'
import {useSelector} from "react-redux";
import "../styles/HeaderOption.css"
import {Avatar} from "@mui/material";
import { selectUser } from '../features/userSlice.js';
function HeaderOptions({avatar, Icon, title, logoutOfApp}) {

  const user = useSelector(selectUser);

  return (
    <div className="headerOption">
      {Icon && <Icon className="headerOption__icon"/>}
      {avatar && (
        <Avatar className="headerOption__icon" src={user?.photoURL} onClick={logoutOfApp}>
          {user?.email[0]}
        </Avatar>
      )}
      <h3 className="headerOption_title">{title}</h3>
    </div>
  )
}

export default HeaderOptions
