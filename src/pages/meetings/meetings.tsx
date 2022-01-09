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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import "./meeting.css";
import { useState } from "react";
import Axios from "axios";
import { today } from "ionicons/icons";
const Meetings: React.FC = () => {
  const history = useHistory();
  const dateValue: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    20
  );
  const startDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    
  );

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
        <div>
          <CalendarComponent isMultiSelection={true} value={dateValue}></CalendarComponent>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Meetings;
