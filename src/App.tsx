import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Chat from "./pages/chat/chat";
import Ticket from "./pages/chat/ticket";
import Meetings from "./pages/meetings/meetings";
import ExtraServices from "./pages/extraservices/extraservices";
import Properties from "./pages/properties/properties";
import Dashboard from "./pages/dashboard/dashboard";
import Listtenant from "./pages/listtenant/listtenant";
import NewService from "./pages/extraservices/newservice";
import NewProperties from "./pages/properties/newproperties";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/Login" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/page/Login" exact={true}>
              <Login />
            </Route>
            <Route path="/page/register">
              <Register />
            </Route>
            <Route path="/page/newProperty">
              <NewProperties />
            </Route>
            <Route path="/page/newService">
              <NewService />
            </Route>
            <Route path="/page/Dashboard">
            <Dashboard />
            </Route>
            <Route path="/page/Chat" exact={true}>
              <Chat />
            </Route>
            <Route path="/page/Ticket">
              <Ticket />
            </Route>
            <Route path="/page/Meetings">
              <Meetings />
            </Route>
            <Route path="/page/Properties">
              <Properties />
            </Route>
            <Route path="/page/Listtenant">
              <Listtenant />
            </Route>
            <Route path="/page/ExtraServices">
              <ExtraServices />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
