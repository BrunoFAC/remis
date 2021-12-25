import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./chat.css";
import { useHistory } from "react-router-dom";
import { BACKDROP } from "@ionic/core/dist/types/utils/overlays";
import { useState } from "react";


const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const history = useHistory();
  function ticket(){
    history.push("/page/Ticket")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Chat </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="landlordtalk">Landlord - Live Chat</div>
        <div className="textareatalk">
          <textarea
            className="placeholdertalk"
            maxLength={450}
            placeholder="What can I help you with ?"
          />
        </div>
        <div className="fullmensagebut">
          <button className="buttonmessage">Submit Message</button>
        </div>
        <div className="fullticketbut">
          <button onClick={ticket} className="buttonticket">
            Create Ticket
          </button>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chat;
