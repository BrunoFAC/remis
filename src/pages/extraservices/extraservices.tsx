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
import "./extraservices.css";
import { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { ticketOutline, today } from "ionicons/icons";
import { decodeToken } from "react-jwt";

interface ExtraService {
  service: string;
  price: number;
  image: string;
}

const ExtraServices = () => {
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  const token = localStorage.getItem("user-info")?.toString();
  const [extras, setExtras] = useState<ExtraService[]>([]);
  const [selectedServices, setSelectedServices] = useState<ExtraService[]>(
    // load selected services from session storage or default to
    // empty array if there's nothing saved
    (JSON.parse(
      sessionStorage.getItem("SelectedServices") as string
    ) as ExtraService[]) || []
  );
  const [price, setPrice] = useState<string>("");
  let [type, setType] = useState(0);

  useEffect(() => {
    function loadExtraServices() {
      let tokend: any = [];
      if (token != null) {
        tokend = decodeToken(token);
        setMyDecodedToken(tokend);
        setType(tokend.type);
      }
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=getExtraServices", {
          extra: extras,
        })
        .then((response) => {
          if (response.data == 0) {
            console.log("extras is empty");
          } else {
            setExtras(response.data);
          }
        });
    }
    loadExtraServices();
  }, []);

  useEffect(() => {
    function persistInSession() {
      sessionStorage.setItem(
        "SelectedServices",
        JSON.stringify(selectedServices)
      );
    }
    persistInSession();

    function updatePrice() {
      const price = selectedServices.reduce(
        (sum, { price }) => sum + +price,
        0
      );

      setPrice(`${price.toFixed(2)}€`);
    }
    updatePrice();
  }, [selectedServices]);

  const handleServiceToggle = (
    e: CustomEvent<CheckboxChangeEventDetail<string>>
  ) => {
    if (e.detail.checked) {
      const selectedService = extras.find(
        ({ service }) => service === e.detail.value
      );

      if (selectedService) {
        setSelectedServices([...selectedServices, selectedService]);
      }
    } else {
      setSelectedServices(
        selectedServices.filter(({ service }) => service !== e.detail.value)
      );
    }
  };

  const handleAddServicesClick = () => {
    if (token != null) {
      let tokend: any = [];
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      let services = [];
      services = selectedServices;
      console.log(services);
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=generatePDF", {
          selectedServicesArray: services,
          total_price: price,
          tenant_id: tokend.id,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data == 0) {
            alert("Error Occurred");
          } else {
            alert("Your services has been requested");
          }
        });
    }
  };

  if (type == 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Extra Services</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              {extras.map(({ service, image, price }) => (
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{service}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                      <img src={image} alt={service} />
                    </IonCardContent>
                    <IonItem className="ion-activated">
                      <IonLabel>Order for {price}</IonLabel>
                      <IonCheckbox
                        slot="end"
                        color="primary"
                        value={service}
                        onIonChange={handleServiceToggle}
                      />
                    </IonItem>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
            <IonButton expand="block" onClick={handleAddServicesClick}>
              Request services {price}
            </IonButton>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Extra Services</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonButton color="primary" className="btn_seeproperty">
            <IonIcon slot="start" icon={addCircle} />
            Add new service
          </IonButton>
          <IonGrid>
            {extras.map(({ service, image, price }) => (
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>{service}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <img src={image} alt={service} />
                    </IonCardContent>
                    <IonItem className="ion-activated">
                      <IonLabel>Price: {price}</IonLabel>
                    </IonItem>
                    <IonButton color="warning" className="btn_seeproperty">
                      <IonIcon slot="start" icon={createOutline} />
                      Edit Service
                      <IonIcon slot="end" icon={arrowForward} />
                    </IonButton>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
};

export default ExtraServices;
