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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCheckbox,
  CheckboxCustomEvent,
  CheckboxChangeEventDetail,
  IonInput,
} from "@ionic/react";
import {
  pin,
  wifi,
  wine,
  warning,
  walk,
  pricetag,
  createOutline,
  arrowForward,
  addCircle,
  addCircleOutline,
  addOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./newservice.css";
import { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { ticketOutline, today } from "ionicons/icons";
import { decodeToken } from "react-jwt";

const NewService: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();
  const addnewservices = () => {
    if (name == "" || price == "") {
      alert("Invalid product.");
    } else {
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=newservice", {
          name: name,
          price: price,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("new product not registered");
            alert("New product not registered.");
          } else {
            console.log(response.data);
            alert("New product registered.");
          }
        });
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>New Services</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="service">
            <h1 className="create">Create a new service</h1>
          <div className="firstnameRegisto">
            <input
              className="registoplaceholder"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Insert the name of new service.."
              required
            />
          </div>
          <div className="firstnameRegisto">
            <input
              className="registoplaceholder"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Insert the price of new service.."
              
            />
          </div>
          <div className="totalbuttonregistar">
            <button onClick={addnewservices} className="botaoService">
                New Service
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewService;
