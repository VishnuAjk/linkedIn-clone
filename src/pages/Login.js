import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import "../styles/Login.css";
import { auth } from '../firebase.js';
import { login } from '../features/userSlice.js';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const dispatch = useDispatch();

    const register = ()=>{
        if(!name){
            alert("Please Enter a Full name");
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userAuth)=>{
                updateProfile(userAuth.user, {
                    displayName:name,
                    photoURL: profilePic,
                })
                .then(()=>{
                    dispatch(login({
                        email:userAuth.user.email,
                        uid:userAuth.user.uid,
                        displayName:name,
                        photoURL:profilePic
                }))
            })
        }).catch(error=> alert(error));
    };

    const loginToApp = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            dispatch(login({
                email:userAuth.user.email,
                uid:userAuth.uid,
                displayName: userAuth.user.displayName,
                photoURL : userAuth.user.photoURL

            }))
    }).catch(error=>alert(error));
}
    
    return (
        <div className='login'>
        <img src="https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png" alt="linkedInLogo" />

        <form>
            <input value={name} 
                onChange={e=>setName(e.target.value)}
                placeholder='Full name (required if registering)' 
                type="text" />

            <input value={profilePic}
                onChange={e=>setProfilePic(e.target.value)}
                placeholder='Profile Pic URL (optional)' 
                type="text" />

            <input value={email} 
                onChange={e=>setEmail(e.target.value)}
                placeholder='Email' 
                type="email" />

            <input value={password} 
                onChange={e=>setPassword(e.target.value)}
                placeholder='Password' 
                type="password" />

            <button onClick={loginToApp} type='submit'>Sign In</button>
        </form>

        <p>Not a member?{" "}
            <span className='login__register' onClick={register}>Register Now</span>
        </p>

        </div>
    )
}


export default Login;
