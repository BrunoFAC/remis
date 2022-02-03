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
import { pin, wifi, wine, warning, walk, pricetag } from "ionicons/icons";
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

  useEffect(() => {
    function loadExtraServices() {
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=getExtraServices", {
          extra: extras,
        })
        .then((response) => {
          console.log(response);

          if (response.data == 0) {
            console.log("extras is empty");
          } else {
            setExtras(response.data);
            console.log(response.data);
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

      console.log(price);
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
      axios
        .post("https://remis.jbr-projects.pt/db/index.php?f=generatePDF", {
          selectedServices: selectedServices,
          total_price: price,
          tenant_id: tokend.id,
        })
        .then((response) => {
          console.log(response);

          if (response.data == 0) {
            alert("Error Occurred");
          } else {
            alert("Services Added. You can download your invoice");
          }
        });
    }
    console.log("Selected services:", selectedServices);
    console.log("Total price:", price);
  };

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
          <IonRow>Total price: {price}</IonRow>
          <IonButton expand="block" onClick={handleAddServicesClick}>
            Add services
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ExtraServices;
