/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import * as React from "react";
import { useState } from "react";
//import { render } from "react-dom";
  import {
    FirebaseAuthProvider,
    IfFirebaseAuthed,
    IfFirebaseUnAuthed
  } from "@react-firebase/auth";
  import { State } from "react-powerplug";
  import firebase from "firebase/app";
  import "firebase/auth";
  import { config } from "../config";

  const Auth_Database = ({ visible, logined }) => {
    const [loginStatus, setLoginStatus] = useState(false);
      
      return(
        <div className={`loginModel ${visible ? 'visible' : 'hide'}`} 
        style={{
            margin: "20px 8px 8px 40px",
            fontStyle: "normal",
            fontVariant: "normal",
            textRendering: "auto",
            textDecoration: "inherit",
            WebkitFontSmoothing: "antialiased"}}>
                
          <FirebaseAuthProvider {...config} firebase={firebase}>
            <State initial={{ isLoading: false }}>
            {({ state, setState }) => (
                <React.Fragment>
                <IfFirebaseAuthed>
                    <div onLoad={ setLoginStatus(true) }>
                    <h2 style={{color: "white"}}> Edit Mode </h2>
                    <button className="logout-btn"
                        onClick={async () => {
                        setState({ isLoading: true });
                        await firebase
                            .app()
                            .auth()
                            .signOut();
                            setState({ isLoading: false });
                        }}
                    >
                        Logout
                    </button>
                    </div>
                </IfFirebaseAuthed>
                <IfFirebaseUnAuthed>
                    <div onLoad={ setLoginStatus(false) }>
                    <h2 style={{color: "white"}}>View Mode</h2>
                    <button className="login-btn"
                        onClick={() => {
                            setState({ isLoading: true });
                            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                            //googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
                            firebase.auth().signInWithPopup(googleAuthProvider);
                            //setState({ isLoading: false });
                        }}
                    >
                        Login
                    </button>
                    </div>
                </IfFirebaseUnAuthed>
                </React.Fragment>
            )}
            </State>
        </FirebaseAuthProvider>
    </div>
   );
  };

  export default Auth_Database;