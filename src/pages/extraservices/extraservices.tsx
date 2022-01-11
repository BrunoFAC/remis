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
} from "@ionic/react";
import { pin, wifi, wine, warning, walk, pricetag } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./extraservices.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ticketOutline, today } from "ionicons/icons";


const ExtraServices: React.FC = () => {
  let [extras, setExtras] = useState([]);

  function extraservice() {
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

  useEffect(() => {
    extraservice();
  }, []);

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
        {/* <IonCard>
          <IonItem href="#">
            <IonIcon icon={wine} slot="start" />
            <IonLabel>Card Link Item 2</IonLabel>
          </IonItem>

          <IonItem className="ion-activated">
            <IonIcon icon={warning} slot="start" />
            <IonLabel>Card Button Item 1 activated</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={walk} slot="start" />
            <IonLabel>Card Button Item 2</IonLabel>
          </IonItem>
        </IonCard> */}
        <IonGrid>
          <IonRow>
            <IonCol>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Groceries at home</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Tired of having to constantly restock your fridge? Then order
                  the "Groceries at home" service!
                </IonCardContent>
                <IonCardContent>
                  <img src={require("./images/grocery.png")} />
                </IonCardContent>

                <IonItem href="#grocery" className="ion-activated">
                   <IonIcon icon={pricetag} slot="start" /> 
                  <IonLabel>Order for 5.99e</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>

            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Laundry service</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Laundry that needs washing will be taken and returned when
                  clean and dry!
                </IonCardContent>
                <IonCardContent>
                  <img src={require("./images/laundry.png")} />
                </IonCardContent>

                <IonItem href="#grocery" className="ion-activated">
                  {/* <IonIcon icon={pricetag} slot="start" /> */}
                  <IonLabel>Order for 5.99e</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>

            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Access to washing machines</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  If you need your clothes washed and don't want to use public
                  washing machines, you can get this service.
                </IonCardContent>
                <IonCardContent>
                  <img src={require("./images/washing-machine.png")} />
                </IonCardContent>
                <IonItem href="#" className="ion-activated">
                  <IonIcon icon={pricetag} slot="start" />
                  <IonLabel>Order for 5.99e</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Cleaning service</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  This service includes the whole appartment cleaning.
                </IonCardContent>
                <IonCardContent>
                  <img src={require("./images/car-wash.png")} />
                </IonCardContent>

                <IonItem href="#grocery" className="ion-activated">
                  <IonIcon icon={pricetag} slot="start" />
                  <IonLabel>Order for 5.99e</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Beverage service</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  This service includes access to the beverage machine.
                </IonCardContent>
                <IonCardContent>
                  <img src={require("./images/beverage.png")} />
                </IonCardContent>

                <IonItem href="#grocery" className="ion-activated">
                  <IonIcon icon={pricetag} slot="start" />
                  <IonLabel>Order for 5.99e</IonLabel>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* 
      <IonRow>
        <IonCol size="3">ion-col size="3"</IonCol>
        <IonCol>ion-col</IonCol>
        <IonCol size="3">ion-col size="3"</IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="3">ion-col size="3"</IonCol>
        <IonCol size="3" offset="3">
          ion-col size="3" offset="3"
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>ion-col</IonCol>
        <IonCol>
          ion-col
          <br />#
        </IonCol>
        <IonCol>
          ion-col
          <br />#
          <br />#
        </IonCol>
        <IonCol>
          ion-col
          <br />#
          <br />#
          <br />#
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol className="ion-align-self-start">ion-col start</IonCol>
        <IonCol className="ion-align-self-center">ion-col center</IonCol>
        <IonCol className="ion-align-self-end">ion-col end</IonCol>
        <IonCol>
          ion-col
          <br />#
          <br />#
        </IonCol>
      </IonRow>

      <IonRow className="ion-align-items-start">
        <IonCol>start ion-col</IonCol>
        <IonCol>start ion-col</IonCol>
        <IonCol className="ion-align-self-end">start ion-col end</IonCol>
        <IonCol>
          ion-col
          <br />#
          <br />#
        </IonCol>
      </IonRow>

      <IonRow className="ion-align-items-center">
        <IonCol>center ion-col</IonCol>
        <IonCol>center ion-col</IonCol>
        <IonCol>center ion-col</IonCol>
        <IonCol>
          ion-col
          <br />#
          <br />#
        </IonCol>
      </IonRow>

      <IonRow className="ion-align-items-end">
        <IonCol>end ion-col</IonCol>
        <IonCol className="ion-align-self-start">end ion-col start</IonCol>
        <IonCol>end ion-col</IonCol>
        <IonCol>
          ion-col
          <br />#
          <br />#
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12" size-sm>
          ion-col size="12" size-sm
        </IonCol>
        <IonCol size="12" size-sm>
          ion-col size="12" size-sm
        </IonCol>
        <IonCol size="12" size-sm>
          ion-col size="12" size-sm
        </IonCol>
        <IonCol size="12" size-sm>
          ion-col size="12" size-sm
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12" size-md>
          ion-col size="12" size-md
        </IonCol>
        <IonCol size="12" size-md>
          ion-col size="12" size-md
        </IonCol>
        <IonCol size="12" size-md>
          ion-col size="12" size-md
        </IonCol>
        <IonCol size="12" size-md>
          ion-col size="12" size-md
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="6" size-lg offset="3">
          ion-col size="6" size-lg offset="3"
        </IonCol>
        <IonCol size="3" size-lg>
          ion-col size="3" size-lg
        </IonCol>
      </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ExtraServices;
