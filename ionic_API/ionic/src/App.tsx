import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AuthProvider } from "./contexts/AuthContext";

// Import des pages
import Homepage from "./pages/Homepage/Homepage";
import Tab3 from "./pages/Tab3";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profil from "./pages/profil/Profil";
import MyActivity from "./pages/activity/MyActivity";
import AddActivity from "./pages/activity/AddActivity";

// Import des composants
import Header from "./components/header/header";
import TabBar from "./components/TabBar/TabBar";

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
      <AuthProvider>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/homepage">
              <Homepage />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/profil">
              <Profil />
            </Route>

            <Route path="/my-activity">
              <MyActivity />
            </Route>

            <Route path="/add-activity">
              <AddActivity />
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
          <TabBar />
        </IonTabs>
      </AuthProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
