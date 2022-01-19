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
import "./meetings.css";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { ticketOutline, today } from "ionicons/icons";
const Meetings: React.FC = () => {
  const history = useHistory();

  const [dateValue, setDataValue] = useState<Date>();
 
  let [id, setId] = useState(0);
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  const [reason, setReason] = useState<string>();
  const token = localStorage.getItem("user-info")?.toString();
  function meeting() {
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setId(tokend.id);
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=meetings", {
          type: tokend.type,
          id: tokend.id,
          date:dateValue,
          reason:reason,  
        })
        .then((response) => {
            console.log(response);
          
        });
    }
  }

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
            isMultiSelection={false}
            value={dateValue} 
            showTodayButton={false}
            
          ></CalendarComponent>
        </div>
        <div>
          <div className="inputmeetings">
            <IonTextarea value={reason} onIonChange={e => setReason(e.detail.value!)} className="" placeholder="Reason:"></IonTextarea>
          </div>
          <IonButton onClick={meeting} expand="block" color="primary">
            Make an Appointment
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Meetings;
