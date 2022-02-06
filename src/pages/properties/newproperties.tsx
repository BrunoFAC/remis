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
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./newproperty.css";
import { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { ticketOutline, today } from "ionicons/icons";
import { decodeToken } from "react-jwt";

const NewProperties: React.FC = () => {
  let [price, setPrice] = useState("");
  let [name, setName] = useState("");
  let [size, setSize] = useState("");
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  const token = localStorage.getItem("user-info")?.toString();

  function addProperty() {
    if (name == "" || price == "" || size == "") {
      alert("Fields must be filled");
    } else {
      if (token != null) {
        let tokend: any = [];
        tokend = decodeToken(token);
        setMyDecodedToken(tokend);
        axios
          .post("https://remis.jbr-projects.pt/db/index.php?f=addProperty", {
            landlord_id: tokend.id,
            property_name: name,
            property_price: price,
            property_size: size,
          })
          .then((response) => {
            if (response.data == 0) {
              console.log("Property can't be added");
            } else {
              alert("Property has been added");
              window.location.href = "http://localhost:8100/page/Properties";
            }
          });
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>New Property</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="register">
          <div className="firstnameRegisto">
            <input
              className="registoplaceholder"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Insert property name..."
              required
            />
          </div>
          <div className="firstnameRegisto">
            <input
              className="registoplaceholder"
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Insert price per month..."
              required
            />
          </div>
          <div className="emailRegisto">
            <input
              className="btnSize"
              onChange={(e) => {
                setSize(e.target.value);
              }}
              placeholder="Insert size..."
              required
            />
            &nbsp;m<sup>2</sup>
          </div>
          <IonButton
            color="primary"
            onClick={addProperty}
            className="btn_seeproperty"
          >
            <IonIcon slot="start" icon={addCircle} />
            Add new property
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewProperties;
