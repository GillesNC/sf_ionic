import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { home, logIn, person, list, logOut } from "ionicons/icons";
import { useAuth } from "../../contexts/AuthContext";

export default function TabBar() {
  const { user } = useAuth();

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="Homepage" href="/homepage">
        <IonIcon aria-hidden="true" icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profil" href="/profil">
        <IonIcon aria-hidden="true" icon={person} />
        <IonLabel>Profil</IonLabel>
      </IonTabButton>
      <IonTabButton tab="activity" href="/my-activity">
        <IonIcon aria-hidden="true" icon={list} />
        <IonLabel>Mes activités</IonLabel>
      </IonTabButton>

      {user ? (
        <IonTabButton tab="login" href="/logout">
          <IonIcon aria-hidden="true" icon={logOut} />
          <IonLabel>Logout</IonLabel>
        </IonTabButton>
      ) : (
        <IonTabButton tab="login" href="/login">
          <IonIcon aria-hidden="true" icon={logIn} />
          <IonLabel>Login</IonLabel>
        </IonTabButton>
      )}
    </IonTabBar>
  );
}
