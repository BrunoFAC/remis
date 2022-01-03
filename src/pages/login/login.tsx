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
import axios from "axios";
const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function successfullogin() {
    axios
      .post("https://remis.jbr-projects.pt/db/index.php?f=login_tenant", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data == 0) {
          console.log("user not registered");
          alert("no.");
        } else {
          console.log(response.data);
          alert("login.");
        }
      });
  }

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
            </IonButtons>
            <IonTitle>Login</IonTitle>
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
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="passLogin">
                <input
                  className="placeholderpass"
                  type="password"
                  placeholder="Insert your password..."
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="totalbotaologin">
                <button className="botaoLogin" onClick={successfullogin}>Sign in</button>
              </div>
            </div>
            <div className="totalredirectregister">
              <button onClick={donthave} className="redirectregister">
                Don't have an account? Sign up!
              </button>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Login;
