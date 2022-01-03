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
import "./chat.css";
import { useHistory } from "react-router-dom";
import "./ticket.css";
import { useState } from "react";
import Axios from "axios";
const Ticket: React.FC = () => {
  const history = useHistory();
  const [reasonticket, setReasonticket] = useState("");
  const [selected, setSelected] = useState<string>("");
  Axios.post("http://localhost:8001/ticketsubmitted", {
    selected: selected,
    reasonticket: reasonticket,
  }).then((response) => {
    console.log(response);
  });
  function back() {
    history.push("/page/Chat");
  }
  function submittedTicket() {
    alert("Ticket submited!");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Submit Ticket</IonTitle>
          <button className="buttoncancel" slot="end" onClick={back}>
            CANCEL
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonRadioGroup
            value={selected}
            onIonChange={(e) => setSelected(e.detail.value)}
          >
            <IonListHeader>
              <IonLabel>Why are you creating a ticket?</IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>Press Charges</IonLabel>
              <IonRadio slot="start" value="Press Charges" />
            </IonItem>

            <IonItem>
              <IonLabel>Bill</IonLabel>
              <IonRadio slot="start" value="Bill" />
            </IonItem>

            <IonItem>
              <IonLabel>Doubts</IonLabel>
              <IonRadio slot="start" value="Doubts" />
            </IonItem>

            <IonItem>
              <IonLabel>Others</IonLabel>
              <IonRadio slot="start" value="Others" />
            </IonItem>
          </IonRadioGroup>
          <IonItemDivider>Your Selection</IonItemDivider>
          <IonItem>{selected ?? "(none selected"}</IonItem>
        </IonList>
        <textarea
          className="placeholderticket"
          maxLength={450}
          placeholder="Reason.."
          onChange={(e) => setReasonticket(e.target.value)}
        />
        <div className="fullsubmitticketbut">
          <button className="buttonsubmitticket">Submit Ticket</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Ticket;
