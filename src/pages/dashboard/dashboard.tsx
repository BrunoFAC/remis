import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
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
  IonSlide,
  IonSlides,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./dashboard.css";
import { useHistory } from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  ticket,
  ticketOutline,
  send,
  arrowForward,
  eyeOutline,
  informationCircle,
} from "ionicons/icons";
import { decodeToken } from "react-jwt";
import axios from "axios";
const Dashboard: React.FC = () => {
  const history = useHistory();
  let seeproperties = {};
  const slideOpts = {
    slidesPerView: 1,
    autoplay: true,
    initialSlide: 2,
    centeredSlides: true,
  };
  const token = localStorage.getItem("user-info")?.toString();
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  let [id, setId] = useState(0);
  let [receiverid, setReceiverid] = useState(0);
  function properties() {
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setId(tokend.id);
      axios
        .post(
          "https://remis.jbr-projects.pt/db/index.php?f=getPropertyTenant",
          {
            id: tokend.id,
          }
        )
        .then((response) => {
          if (response.data == 0) {
            console.log(response);
          } else {
            seeproperties = response.data;
            console.log(response);
          }
        });
    }
  }
  useEffect(() => {
    properties();
    console.log(seeproperties);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>{seeproperties.property_name}</div>
        {/*   {seeproperties.map((val: any, key: any) => {
          return (
            <IonCol key={val.id}>
              <IonCard>
                <IonSlides options={slideOpts}>
                  {val.property_images.map((val_image: any, key_image: any) => {
                    return (
                      <IonSlide>
                        <img src={val_image.property_src} />
                      </IonSlide>
                    );
                  })}
                </IonSlides>
                <IonCardHeader>
                  <IonCardTitle>{val.property_name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="content-card">
                  Price: €{val.property_price_month}
                  <br />
                  Size: {val.property_size}m<sup>2</sup>
                </IonCardContent>
                <div className="rented_propertie">
                  <IonLabel>Rented</IonLabel>
                  <br />
                  <small>
                    This property is rented from &nbsp;
                    {val.property_date_rented_from} to &nbsp;
                    {val.property_date_rented_to}
                  </small>
                </div>
                <IonButton className="btn_seeproperty">
                  <IonIcon slot="start" icon={informationCircle} />
                  See renting information
                  <IonIcon slot="end" icon={arrowForward} />
                </IonButton>
              </IonCard>
            </IonCol>
          );
        })}*/}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
