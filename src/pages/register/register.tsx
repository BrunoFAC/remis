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
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

const Register: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const history = useHistory();
  const register = () => {
    if (
      firstname == "" ||
      lastname == "" ||
      emailReg == "" ||
      passwordReg == "" ||
      telemovel.length < 9
    ) {
      alert ("Invalid register");
    } else {
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=regist_tenant", {
          firstname: firstname,
          lastname: lastname,
          email: emailReg,
          password: passwordReg,
          telemovel: telemovel,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("user not registered");
            alert("Successful not registered.");
          } else {
            console.log(response.data);
            alert("Successful registered.");
          }
        });
    }
  };
  const alreadyhave = () => {
    history.push("/page/Login");
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="register">
          <img src={require("./images/Logo.png")} />

          <div className="firstnameRegisto">
            <input
              className="nomeRegistoplaceholder"
              type="text"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              placeholder="Insert your first name..."
              required
            />
          </div>
          <div className="firstnameRegisto">
            <input
              className="nomeRegistoplaceholder"
              type="text"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              placeholder="Insert your first last name..."
              required
            />
          </div>
          <div className="emailRegisto">
            <input
              className="emailRegistoplaceholder"
              type="email"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
              placeholder="Insert your e-mail..."
              required
            />
          </div>
          <div className="passRegisto">
            <input
              className="passRegistoplaceholder"
              type="password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
              placeholder="Insert your password..."
              required
            />
          </div>
          <PhoneInput
            value={telemovel}
            maxLength={20}
            onChange={(tele: string) => {
              console.log(tele);
            }}
            disabled={false}
            autoComplete="tel"
            defaultCountry="DE"
            placeholder="Place holder"
            international={true}
            countrySelectProps={{ tabIndex: "-1" }}
            onBlur={(ev: React.FocusEvent<HTMLInputElement>) => {
              setTelemovel(ev.currentTarget.value);
            }}
          />
          <div className="totalbuttonregistar">
            <button onClick={register} className="botaoRegistar">
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
