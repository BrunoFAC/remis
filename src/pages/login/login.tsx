import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./login.css";
import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { options } from "ionicons/icons";
import Logo from "./images/Logo.png";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  function fullogin() {
    if (user == "0") {
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=login_tenant", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("user not registered");
            alert("Incorrect login!");
          } else {
            localStorage.setItem("user-info", response.data);
            alert("Successful login!");
            history.push("/page/Dashboard")
          }
        });
    } else if (user == "1") {
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=login_landlord", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("incorrect user");
            alert("Incorrect login!");
          } else {
            localStorage.setItem("user-info", response.data);
            alert("Successful login!");
            history.push("/page/Meetings")
          }
        });
    }
  }
  const donthave = () => {
    history.push("/page/register");
  };
  return (
    <div className="LoginPage">
      <IonPage>
        <IonContent fullscreen>
          <div className="login">
            <img src={Logo} />
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
              <IonItem>
                <IonLabel>User Account</IonLabel>
                <IonSelect
                  onIonChange={(e) => setUser(e.detail.value)}
                  interface="popover"
                  interfaceOptions={options}
                >
                  <IonSelectOption value="0">Tenant</IonSelectOption>
                  <IonSelectOption value="1">Landlord</IonSelectOption>
                </IonSelect>
              </IonItem>
              <div className="totalbotaologin">
                <button className="botaoLogin" onClick={fullogin}>
                  Sign In
                </button>
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
