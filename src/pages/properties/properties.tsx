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
  IonSlide,
  IonSlides,
} from "@ionic/react";
import "./properties.css";
import { Link, useHistory } from "react-router-dom";
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
import {
  arrowForward,
  informationCircle,
  eyeOutline,
  createOutline,
  addCircle,
} from "ionicons/icons";

const Properties: React.FC = () => {
  let [availableProperties, setProperties] = useState([]);
  let [id, setId] = useState(0);
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  const token = localStorage.getItem("user-info")?.toString();
  const slideOpts = {
    slidesPerView: 1,
    autoplay: true,
    initialSlide: 2,
    centeredSlides: true,
  };

  function properties() {
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setId(tokend.id);
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=getProperties", {
          id: id,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("properties is empty");
          } else {
            setProperties(response.data);
            console.log(response.data);
          }
        });
    }
  }
  useEffect(() => {
    properties();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Properties</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} fullscreen>
        <Link to="/page/newProperty">
          <IonButton color="primary" className="btn_seeproperty">
            <IonIcon slot="start" icon={addCircle} />
            Add new property
          </IonButton>
        </Link>
        <IonGrid>
          <IonRow>
            {availableProperties.map((val: any, key: any) => {
              if (val.property_available == 1) {
                return (
                  <IonCol key={val.id}>
                    <IonCard>
                      <IonSlides options={slideOpts}>
                        {val.property_images.map(
                          (val_image: any, key_image: any) => {
                            return (
                              <IonSlide>
                                <img src={val_image.property_src} />
                              </IonSlide>
                            );
                          }
                        )}
                      </IonSlides>
                      <IonCardHeader>
                        <IonCardTitle>{val.property_name}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="content-card">
                        Price: €{val.property_price_month}
                        <br />
                        Size: {val.property_size}m<sup>2</sup>
                      </IonCardContent>
                      <div className="available_propertie">
                        <IonLabel>Available</IonLabel>
                      </div>
                      <IonButton color="warning" className="btn_seeproperty">
                        <IonIcon slot="start" icon={createOutline} />
                        Edit Property
                        <IonIcon slot="end" icon={arrowForward} />
                      </IonButton>
                    </IonCard>
                  </IonCol>
                );
              } else {
                return (
                  <IonCol key={val.id}>
                    <IonCard>
                      <IonSlides options={slideOpts}>
                        {val.property_images.map(
                          (val_image: any, key_image: any) => {
                            return (
                              <IonSlide>
                                <img src={val_image.property_src} />
                              </IonSlide>
                            );
                          }
                        )}
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
              }
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Properties;

export {};
