import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
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
  IonTextarea,
  IonTitle,
  IonToggle,
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
import { decodeToken } from "react-jwt";
import axios from "axios";
import { send, ticketOutline } from "ionicons/icons";
import { url } from "inspector";

const Chat: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/page/Login");
    }
  }, []);
  let [messages, setMessages] = useState([]);
  
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
            console.log(response.data);
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
          function showtime() {
            <div>
              <p>{val.tsent}</p>
            </div>;
          }
          if (val.sender == id) {
            /*quem esta a enviar mensagens*/

            return (
              <div className="spacing">
                <IonButton
                  onClick={showtime}
                  className="whosends"
                  size="small"
                  color="primary"
                >
                  {val.text}
                </IonButton>
                <div className="timesentsends">
                  <label>Sent {val.tsent}</label>
                </div>
              </div>
            );
          } else {
            return (
              <div className="spacing">
                <IonButton
                  onClick={showtime}
                  className="whoreceives"
                  size="small"
                  color="medium"
                >
                  {val.text}
                </IonButton>
                <div className="timesentreceive">
                  <label>Sent {val.tsent}</label>
                </div>
              </div>
            );
          }
        })}
      </IonContent>
      <IonFooter>
        <div className="inputsends">
          <IonTextarea placeholder="What can I help you with?"></IonTextarea>
        </div>
        <div className="sendbut">
          <IonButton>
            <IonIcon icon={send} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
