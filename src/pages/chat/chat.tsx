import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./chat.css";
import { useHistory } from "react-router-dom";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { text } from "ionicons/icons";
import { decodeToken } from "react-jwt";
import { type } from "os";
import axios from "axios";

const Chat: React.FC = () => {
  let [messages, setMessages] = useState([]);
  const history = useHistory();
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  let [id, setId] = useState(0);
  function gettenantschat() {
    const token = localStorage.getItem("user-info")?.toString();
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setId(tokend.id);
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=chat", {
          type: tokend.type,
          id: tokend.id,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("cannot show messages");
          } else {
            setMessages(response.data);
          }
        });
    }
  }
  //preciso hora , sessao iniciada e para quem envia, corpo
  useEffect(() => {
    gettenantschat();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {messages.map((val: any, k: any) => {
          console.log(val.sender);
          console.log(id);

          if (val.sender == id) {/*quem esta a enviar mensagens*/ 
            return <div className="sender">{val.text}</div>;
          } else {
            return <div className="received">{val.text}</div>;
          }
        })}
      </IonContent>
    </IonPage>
  );
};

export default Chat;
