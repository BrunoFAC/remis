import {
  IonAvatar,
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
  IonListHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import "./listtenant.css";
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
import { logoWindows, send } from "ionicons/icons";

const Listtenant: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/page/Login");
    }
  }, []);
  let [tenants, setTenants] = useState([]);
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  let [id, setId] = useState(0);

  const token = localStorage.getItem("user-info")?.toString();

  function getTenantChat(tenant_id: any) {
    console.log(tenant_id);
    localStorage.setItem("tenant_id", tenant_id);
    window.location.href = "http://localhost:8100/page/Chat";
  }

  function gettenants() {
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setId(tokend.type);
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=getTenants", {
          id: 1,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("cannot show tenants");
          } else {
            //console.log(response.data);
            setTenants(response.data);
          }
        });
    }
  }

  useEffect(() => {
    gettenants();
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
      <IonContent>
        <IonList>
          <IonListHeader>
            <h1>Tenant Conversations</h1>
          </IonListHeader>
          {tenants.map((val: any, key: any) => {
            return (
              <IonItem
                button
                onClick={() => {
                  getTenantChat(val.tenant_id);
                }}
                detail
              >
                <IonAvatar slot="start">
                  <img src={require("./images/user_logo.png")} />
                </IonAvatar>
                <IonLabel>
                  <h2>
                    {val.tenant_firstname} {val.tenant_lastname}
                  </h2>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Listtenant;
