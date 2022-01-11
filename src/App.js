import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Main from './Home';
import Form from './Form';
import { NavBar, Footer } from './NavFoot';
import Moment from './Moment';

function App(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        setUser(firebaseUser);

      } else {
        setUser(null);

      }

    });

  });

  const handleLogOut = () => {
    firebase.auth().signOut()

  }

  const uiConfig = {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none',
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },

  };

  if(!user) {
    return (
      <div>
        <NavBar userState={user} />
        <div className="push square-centering signin-height">
          <header className="headerspace">
            <h1><strong>Welcome to Mood Journal!</strong></h1>
            <h2 className="h3">Please sign in:</h2>
          </header>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
        <Footer />
      </div> 
    );

  } else {
    return (
      <BrowserRouter> 
        <NavBar userState={user} handleLogOut={handleLogOut} />
        <Switch>
          <Route exact path="/">
            <Main currentUserID={user.uid} handleLogOut={handleLogOut} resourceList={props.resourceList} />
          </Route>
          <Route path="/form">
            <Form currentUserID={user.uid} />
          </Route>
          <Route path="/moment/:date">
            <Moment />
          </Route>
        </Switch>
      </BrowserRouter>
    );

  }

}


export default App;