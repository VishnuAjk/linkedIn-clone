import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import '../styles/Feed.css';
import { collection, onSnapshot, addDoc, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from '../firebase.js';

import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/Event";
import CalenderViewDayIcon from "@mui/icons-material/CalendarMonth";

import Post from '../pages/Post.js';
import InputOption from '../components/InputOption.js';
import { selectUser } from '../features/userSlice.js';

//Here we import "FilpMove from the library"
import FlipMove from "react-flip-move";

function Feed() {

  const user = useSelector(selectUser);

  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
     //Getting the collection and in which order we want the doc(decreasing order of time)
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc")); 
    //Passing query "q" as per which Snapshot will get all the docs, which we will then map through..
    const unsubscribe = onSnapshot(q, (snapshot) => {  
        setPosts(snapshot.docs.map(doc => (
          { 
            id: doc.id, 
            data: doc.data()
          }
        )));
      });

      return () => unsubscribe();
  },[]);

  const sendPost = async (e)=>{
    e.preventDefault();
    const docRef = await addDoc(collection(db, "posts"), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoURL || '',
      timestamp:  Timestamp.fromDate(new Date()),
    });

    setInput(""); // Clear the input field after posting

  }

  return (
    <div className='feed'>
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon/>  
                <form>
                    <input type="text" 
                          value={input}
                          onChange={e=>setInput(e.target.value)}/>
                    <button onClick={sendPost} type='submit'>Send</button>
                </form> 
            </div>
            <div className="feed__inputOptions">
                 <InputOption Icon={ImageIcon} title="Photo"
                 color="#70B5F9"/>
                 <InputOption Icon={SubscriptionIcon} title="video"
                 color="#E7A33E"/>
                 <InputOption Icon={EventNoteIcon} title="Event"
                 color="#C0CBCD"/>
                 <InputOption Icon={CalenderViewDayIcon} title="Write article"
                 color="#7FC15E"/>
            </div>
        </div>
        {/* POSTS */}
        {/* We wrap the posts within the "FlipMove" for the animation effect */}
        {/* Note: We need the "key={id}" for the animation to take effect" */}
        <FlipMove>
          {posts.map(({id,data:{name, description, message, photoUrl}})=>(
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}/>
          ))}
        </FlipMove>
        
    </div>
  )
}

export default Feed
