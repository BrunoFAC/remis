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
          <img src="https://lh3.googleusercontent.com/gq-vo-wcitrutBHAsfzyF0ttHeNMWfAT-AWbrI8oll7izD-qiNOL0Jq5alwaY4KmC0m2LxYEVW99r96dSauijFTBD1lpiVITdu-joIpCnTDy7dCpAt3GJOA_DxbkR0uf-6G2xPb_aEhnEawP_5skvDO3pNt6wnHED1UFGlzB3NDgXHL4eux0CM45G7oveRhS11emvJBoj_fyBj74PcR5WUMog7yEGu-f_4g0oEFpSIsx90wZHAQZmtu9VhQ5E9bLf5LDpKYePdXb7wltS-xHjeC3HR_Jn4jpNn9oC4WzeZv2toqHGqVh8-iOnkmw7xlkWOO6Zt1r83z0kmcyQG8nBFDvOmbGHFT0HHLN-_h_RoaUUsEX8bL2tHe6X2kdAqHUNohrsiThbJBoGdrDtCbonorYqc0ES7k9mMt-rxazj-jEOkm3uEiCvgt3XaRS2LNomCpuhydcyCBGfrco2ZA9Yr-7RfQtoxCchK8_dHBPVzPnt2FhDyAWv0v0ZHMv0Th2_Z_jV8lrzSsIXhp_IYvu14v5yzZVTXpNqlIdw5bVzl-uOXJHouUIBD9Vy_XsULgiwD0WfxxZI5AVP9E9O-PXo1HGTq1e0f7wKsO57k1JGAS57PdQOF6f88yqEjJRO_zbBytGN8wciaurkdZYb5GxLXjDp3ugo52NQfkksnTKFg2ncL2M5Hre3GCYF7HK5sjgDlg2j_uvggGVAQo=s360-no?authuser=0" />
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
