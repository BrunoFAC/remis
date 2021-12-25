import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonSplitPane,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  analyticsOutline,
  analyticsSharp,
  archiveOutline,
  archiveSharp,
  businessOutline,
  businessSharp,
  calendarClearOutline,
  calendarClearSharp,
  calendarOutline,
  calendarSharp,
  chatbubblesOutline,
  chatbubblesSharp,
  constructOutline,
  constructSharp,
  heartOutline,
  heartSharp,
  logInOutline,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/page/Dashboard",
    iosIcon: analyticsOutline,
    mdIcon: analyticsSharp,
  },
  {
    title: "Properties",
    url: "/page/Properties",
    iosIcon: businessOutline,
    mdIcon: businessSharp,
  },
  {
    title: "Chat",
    url: "/page/Chat",
    iosIcon: chatbubblesOutline,
    mdIcon: chatbubblesSharp,
  },
  {
    title: "Meetings",
    url: "/page/Meetings",
    iosIcon: calendarClearOutline,
    mdIcon: calendarClearSharp,
  },
  {
    title: "Extra Services",
    url: "/page/ExtraServices",
    iosIcon: constructOutline,
    mdIcon: constructSharp,
  },
  {
    title: "Login",
    url: "/page/Login",
    iosIcon: logInOutline,
    mdIcon: logInOutline,
  },
];
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            
          <img src={require("./images/3.png")} />
            REMIS
          </IonListHeader>
         <IonList/>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <div className="creators">REMIS®</div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
