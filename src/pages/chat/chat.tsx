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

const Chat: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/page/Login");
    }
  }, []);
  let [messages, setMessages] = useState([]);
  const [text, setText] = useState<string>();
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  let [id, setId] = useState(0);
  let [receiverid, setReceiverid] = useState(0);

  const token = localStorage.getItem("user-info")?.toString();
  function gettenantschat() {
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

            console.log(response);
            {
              messages.map((val: any) => {
                if (val.sender != tokend.id) {
                  return setReceiverid(val.sender);
                }
              });
            }
          }
        });
    }
  }

  function sendMessages() {
    var date = new Date();
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setId(tokend.id);
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=sendMessage", {
          id: tokend.id,
          receiverid: receiverid,
          type: tokend.type,
          status: "Sent",
          text: text,
          tsent: date,
        })
        .then((result) => {
          if (result.data == 0) {
            console.log("cannot show messages");
          } else {
            console.log(result.data);
            setText(result.data);
            gettenantschat();
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
        {messages.map((val: any) => {
          if (val.sender == id) {
            /*quem esta a enviar mensagens*/

            return (
              <div className="spacing1">
                <label className="whosends" color="primary">
                  {val.text}
                </label>
                <div className="timesentsends">
                  <label>
                    {val.status} {val.tsent}
                  </label>
                </div>
              </div>
            );
          } else {
            return (
              <div className="spacing">
                <label className="whoreceives" color="medium">
                  {val.text}
                </label>
                <div className="timesentreceive">
                  <label>
                    {val.status} {val.tsent}
                  </label>
                </div>
              </div>
            );
          }
        })}
      </IonContent>
      <IonFooter>
        <div className="inputsends">
          <IonTextarea
            onIonChange={(e) => setText(e.detail.value!)}
            placeholder="What can I help you with?"
          ></IonTextarea>
        </div>
        <div className="sendbut">
          <IonButton onClick={sendMessages}>
            <IonIcon icon={send} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
