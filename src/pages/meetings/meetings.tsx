import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
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
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./meetings.css";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { format, parseISO } from "date-fns";

const Meetings: React.FC = () => {
  let [meetings, setMeetings] = useState([]);
  const history = useHistory();
  let [id, setId] = useState(0);
  const [dateval, setDateval] = useState(Date);
  const minDate: string = new Date().toISOString();
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  const [reason, setReason] = useState<string>();
  const token = localStorage.getItem("user-info")?.toString();
  let [type, setType] = useState(0);
  function meeting() {
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setId(tokend.id);

      const formattedString = format(parseISO(dateval), "MMM d, yyyy");
      if (reason == "") {
        alert("Write a reason!");
      } else {
        axios
          .post("https://remis.jbr-projects.pt/db/index.php?f=insertMeeting", {
            type: tokend.type,
            id: tokend.id,
            reason: reason,
            date: dateval,
          })
          .then((response) => {
            console.log(response);
            console.log(formattedString);
            alert("Appointment saved!");
            setReason("");
          });
      }
    }
  }

  function getMeetings() {
    let tokend: any = [];
    if (token != null) {
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setType(tokend.type);
      if (tokend.type != 0) {
        axios
          .post("https://remis.jbr-projects.pt/db/index.php?f=getMeetings", {
            id: tokend.id,
          })
          .then((response) => {
            console.log(response.data);
            setMeetings(response.data);
          });
      }
    }
  }

  useEffect(() => {
    getMeetings();
    let tokend: any = [];
    if (token != null) {
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setType(tokend.type);
    }
  }, []);

  if (type == 0) {
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
            <IonDatetime
              presentation="date"
              min={minDate}
              onIonChange={(e) => setDateval(e.detail.value!)}
            ></IonDatetime>
          </div>
          <div>
            <IonTextarea
              value={reason}
              className="textmeetings"
              onIonChange={(e) => setReason(e.detail.value!)}
              placeholder="Reason:"
            ></IonTextarea>
            <IonButton onClick={meeting} expand="block" color="primary">
              Make an Appointment
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
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
          <IonGrid>
            {meetings.map((val: any, key: any) => {
              return (
                <IonRow>
                  <IonCol>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>{val.meeting_name}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="content-card">
                        Day: {val.meeting_date}
                        <br />
                        Tenant: {val.tenant_firstname}&nbsp;
                        {val.tenant_lastname}
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              );
            })}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
};

export default Meetings;
