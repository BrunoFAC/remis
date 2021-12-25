import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./login.css";
import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

const Login: React.FC = () => {
  const history = useHistory();
  const successfulLogin = () => {
    alert("Successful register!");
    history.push("/page/Dashboard");
  };
  const donthave = () => {
    history.push("/page/register");
  };
  return (
    <div className="LoginPage">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons><IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className="login">
          <img src={require("./images/Logo.png")} />


            <div className="form">
              <div className="emailLogin">
                <input
                  className="placeholderemail"
                  type="email"
                  placeholder="Insert your e-mail..."
                />
              </div>
              <div className="passLogin">
                <input
                  className="placeholderpass"
                  type="password"
                  placeholder="Insert your password..."
                />
              </div>
              <div className="totalbotaologin">
                <button onClick={successfulLogin} className="botaoLogin">
                  Sign in
                </button>
              </div>
            </div>
            <div className="totalredirectregister">
              <button onClick={donthave} className="redirectregister">
                {" "}
                Don't have an account? Sign up!{" "}
              </button>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Login;
