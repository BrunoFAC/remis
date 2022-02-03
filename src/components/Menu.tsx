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

import { useHistory, useLocation } from "react-router-dom";
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
  logOutOutline,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPagesLandlord: AppPage[] = [
  {
    title: "Properties",
    url: "/page/Properties",
    iosIcon: businessOutline,
    mdIcon: businessSharp,
  },
  {
    title: "Chat",
    url: "/page/Listtenant",
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
];

const appPagesTenant: AppPage[] = [
  {
    title: "Dashboard",
    url: "/page/Dashboard",
    iosIcon: analyticsOutline,
    mdIcon: analyticsSharp,
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
];

const Menu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  let [myDecodedToken, setMyDecodedToken] = useState([]);
  const token = localStorage.getItem("user-info")?.toString();
  let [type, setType] = useState(0);

  useEffect(() => {
    let tokend: any = [];
    if (token != null) {
      tokend = decodeToken(token);
      setMyDecodedToken(tokend);
      setType(tokend.type);
    }
  }, []);

  function logout() {
    localStorage.removeItem("user-info");
    alert("Successful logout!");
    window.location.href = "http://localhost:8100/page/Login";
    //history.push("/page/Login");
  }

  if (type == 0) {
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>
              <img src={require("./images/3.png")} />
              REMIS
            </IonListHeader>
            <IonList />
            {appPagesTenant.map((appPage, index) => {
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
            <IonItem
              button
              onClick={() => {
                logout();
              }}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
          <div className="creators">REMIS®</div>
        </IonContent>
      </IonMenu>
    );
  } else {
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>
              <img src={require("./images/3.png")} />
              REMIS
            </IonListHeader>
            <IonList />
            {appPagesLandlord.map((appPage, index) => {
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
            <IonItem
              button
              onClick={() => {
                logout();
              }}
              routerDirection="none"
              lines="none"
              detail={false}
            >
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
          <div className="creators">REMIS®</div>
        </IonContent>
      </IonMenu>
    );
  }
};

export default Menu;
