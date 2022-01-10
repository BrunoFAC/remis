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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import "./meeting.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { ticketOutline, today } from "ionicons/icons";
const Meetings: React.FC = () => {
  const history = useHistory();

  const dateValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    20
  );
  const startDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth()
  );
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
        history.push("/page/Login")
    }
}, [])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Meetings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="meetings">
          <CalendarComponent
            isMultiSelection={true}
            value={dateValue}
          ></CalendarComponent>
        </div>
        <div>
          <div className="inputmeetings">
            <IonTextarea className="" placeholder="Reason:"></IonTextarea>
          </div>
          <IonButton expand="block" color="danger">
            Make an Appointment
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Meetings;

