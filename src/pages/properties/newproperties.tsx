import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonModal,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonTextarea,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    CheckboxCustomEvent,
    CheckboxChangeEventDetail,
  } from "@ionic/react";
  import {
    pin,
    wifi,
    wine,
    warning,
    walk,
    pricetag,
    createOutline,
    arrowForward,
    addCircle,
  } from "ionicons/icons";
  import { useHistory } from "react-router-dom";
  import "./newproperty.css";
  import { MouseEventHandler, useEffect, useState } from "react";
  import axios from "axios";
  import { ticketOutline, today } from "ionicons/icons";
  import { decodeToken } from "react-jwt";
  
  const NewProperties: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>New Property</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent></IonContent>
      </IonPage>
    );
  };
  
  export default NewProperties;