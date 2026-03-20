import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth } from "../../contexts/AuthContext";
import { IonButton } from "@ionic/react";
import "./Profil.css";

export default function Profil() {
  const { user, logout } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {user ? (
          <div className="profile-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <IonButton onClick={logout} color="danger">
              Se déconnecter
            </IonButton>
          </div>
        ) : (
          <div className="not-authenticated">
            <h2>Mon profil</h2>
            <p>Veuillez vous connecter pour voir vos activités.</p>
            <IonButton routerLink="/login">Se connecter</IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
