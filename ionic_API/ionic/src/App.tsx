import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, logIn, person } from "ionicons/icons";

// Import des pages
import Homepage from "./pages/Homepage/Homepage";
import Tab3 from "./pages/Tab3";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profil from "./pages/profil/Profil";

// Import des composants
import Header from "./components/header/header";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    {/* SECTION ROUTE */}
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/homepage">
            <Homepage />
          </Route>
          <Route exact path="/profil/">
            <Profil />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/homepage" />
          </Route>
        </IonRouterOutlet>

        {/* HEADER */}
        <Header />

        {/* SECTION TABBAR */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="Homepage" href="/homepage">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profil" href="/profil">
            <IonIcon aria-hidden="true" icon={person} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="login" href="/login">
            <IonIcon aria-hidden="true" icon={logIn} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
