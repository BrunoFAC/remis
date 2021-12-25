import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonButton,
  IonToolbar,
  IonRouterLink,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import "./register.css";
import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
const Register: React.FC = () => {
  const history = useHistory();
  const successfulRegister = () => {
    alert("Successful register!");
    history.push("/page/Login");
  };
  const alreadyhave = () => {
    history.push("/page/Login");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="register">
          <img src={require("./images/Logo.png")} />
          <div className="nomeRegisto">
            <input
              className="nomeRegistoplaceholder"
              type="text"
              placeholder="Insert your name..."
            />
          </div>
          <div className="emailRegisto">
            <input
              className="emailRegistoplaceholder"
              type="email"
              placeholder="Insert your e-mail..."
            />
          </div>
          <div className="passRegisto">
            <input
              className="passRegistoplaceholder"
              type="password"
              placeholder="Insert your password..."
            />
          </div>
          <div className="totalbuttonregistar">
            <button onClick={successfulRegister} className="botaoRegistar">
              Sign up
            </button>
          </div>
          <button onClick={alreadyhave} className="redirectlogin">
            Already have an account? Sign in!
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
