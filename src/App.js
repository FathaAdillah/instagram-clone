import React, { useState, useEffect } from "react";
import './App.css';
import Post from './Post.js';
import { auth, db } from './firebase'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from "@material-ui/core";
import ImgUpload from "./imageUpload";
//import firebase dari 'firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //kalo user login
        console.log(authUser);
        setUser(authUser);
      } else {
        //kalo user logout
        setUser(null);
      }
    })

    return() => {
      unsubscribe();
    }
  },[user, username]);

  useEffect(() => {

    db.collection('posts').onSnapshot(snapshot => {
    
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.massage))
    setOpen(false);
  }

  const signIn = (event) => {
    event
    .preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.massage))
    setOpenSignIn(false);
  }

  return(
    <div className="app">
      <div>
      {user?.displayName ? (<ImgUpload username= {user.displayName} />):(<h3>Sorry you need to login !!</h3>)}
      </div>
      <Modal
        open={open}
        onClose={()=> setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
            <img className="app_headerimage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x" alt=""           
            />
          </center>
          <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />  
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />  
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <Button type="submit" onClick={signUp}>Sign Up</Button>           
          </form>
        </div>
        </Modal>
        <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
            <img className="app_headerimage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x" alt=""           
            />
          </center>  
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />  
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <Button type="submit" onClick={signIn}>Sign</Button>           
          </form>
        </div>
        </Modal>


      <div className="app_header">
        <img className="app_headerimage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x" alt="" />
        {user ? (
      <Button onClick={() => auth.signOut()}>Logout</Button>  
      ):(
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>
      
      
        <div className="app_posts">
          <div className="app_postLeft">
            {
            posts.map(({id, post}) => (
              <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
            }
          </div>
        </div>
    </div>
  )
  
}

export default App;

// {
//   username : "UserName1",
//   caption: "Caption1",
//   imgUrl: "https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png"
// },{
//   username : "UserName2",
//   caption: "Caption2",
//   imgUrl: "https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png" 
// }