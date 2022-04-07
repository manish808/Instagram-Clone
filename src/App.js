import React, { useState, useEffect } from 'react';
import './App.css';
import './Post.js';
import Post from './Post.js';
import { db } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button} from 'react-bootstrap';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const auth = getAuth();

function App() {

  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  const [openSignIn,setSignIn] = useState(false);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail] = useState('');
  const [user,setUser] = useState(null);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser)
    {
      console.log(authUser);
      setUser(authUser);
    }
    else{
      setUser(null);
    }
    return()=>{
      unsubscribe();
    }
  })
}, [user,username]);

  const signUp= (event) => {
      event.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) =>
      {
          return authUser.user.updateProfile(
            {
              displayName : username
            }
          )
      })
      .catch((error)=>alert(error.message));
      setOpen(false)
   }

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth,email,password).then((username) => {
      setUsername(username);
    }).catch((error) => alert(error.message));
  }
  
  useEffect(() => {

    getDocs(collection(db, "Post_details")).then(snapShot => {
      snapShot.forEach(doc => {
        setPosts(posts => [...posts, doc.data()]);
      });
    });
    
  }, []);
  return (

    <div className="App">
     
      <div className="app_header">
        <img
            className="app_header_image"
            src = "data:image/png;base64,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"
            alt =""
        />

      <Modal
        open={open} 
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Details:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input
             type="text"
            placeholder="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <Input
             type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Input
             type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          </Typography>
          <Button type="submit" onClick={signUp}>Sign Up</Button>
        </Box>
      </Modal>


      <Modal
        open={openSignIn }
        onClose={() => setSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Details:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           
            <Input
             type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Input
             type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          </Typography>
          <Button type="submit" onClick={signIn}>Sign In</Button>
        </Box>
      </Modal>
     
      { user ?
      (
        <Button onClick ={()=> auth.signOut()}>LogOut</Button>
      ):(
      <div className = "loginCredentials">
      <Button onClick = {() => setSignIn(true)}>Sign In</Button>)
      <Button onClick = {() => setOpen(true)}>Sign Up</Button>)
      </div>
     
       )
      } 
       </div>
       <ImageUpload username={username}/>
      <h2> Hello All, Let's start building</h2>
      {
        posts.map(post=>(
          <Post username = {post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        )
      )
      };
     
    </div>
  );
}

export default App;
