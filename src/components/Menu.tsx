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
            
            <img
              src="https://lh3.googleusercontent.com/Df01utHa2kpkfNOqokFuE0Kgz92Kx1Ly0UCg7_WZZHHsmJqy3o3C4-PpTD4AMpju8jEYlBRaUJLj6GVKs1pmXMNUYV-msbQqmosYGKDegfPbdZCzaK5gXBHm6TOtCAgN1VlEZom3ZsgVEr9A0h2rIHkGaopXiH7-SIAiCrJ0-1U6nSPghZ2d0W2OY38EmlsWO6p3yTDPsNOzgqIpXhtcop-JoVpSaRUx7h2AHpwbWMOhkVRvCZWz1L8KJp5yH5KfkE4_vgWsiNFom4_e024ufoLc2mTytv392M7zTGoPv4lcsB2Gj2Qx4n3w72edFlt3SZ83xwjc4gwLnjH-jKk1ku8YPgm58Kvask3_llAgnARX7EJAWgoiM6C4o1DlGC5h9vJ1YH9wsbRtXuA71sYIq_IlZ3_3blMxEfJ6dFt35zwuyK108DziZfT0BLT5scjQQxvtHfwFniN0cQnA8vxI6bAn0TRKu3JzwC4YKUYe2oQKJEqyAv7GOW5CXQMuHFpRhfnt8uOEtWEyBxv_0A3O56qhd7YUa7vehnQvhz6Hl-4xP7h8xYnTpw3lwpfVY7GCUNcHXuUe_kn9Guw1etqYddRXmpx8sqIA8nTKVu1NjTkdvolGcjHWjmQs-srzqzJyWpYU-_FvO1lIUYcmffie5vO-SUndPjku-5T8T0dVAsyfUXE9dW0-rxHs3nVwQqp3ld6Eqxim6JBcc8L3=s40-no?authuser=0"
              alt=""
            />
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
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
