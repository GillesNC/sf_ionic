import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import "./Homepage.css";
import { getActivities } from "../../services/authServices";
import { useEffect, useState } from "react";

interface Activity {
  title: string;
  type: string | null;
  description: string | null;
  place: string;
  nbrPlace: number | null;
  duree: number | null;
  createdAt: string;
}

export default function Homepage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const activities = async () => {
      try {
        const data = await getActivities();
        setActivities(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    activities();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Homepage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar placeholder="Rechercher une activité" />
        <h2>Bienvenue sur notre application d'activités !</h2>
        <p>
          Découvrez une variété d'activités passionnantes à faire près de chez
          vous.
        </p>
        <div className="card-activity">
          <IonCard>
            {activities.map((activity, index) => (
              <IonCardContent className="activity-card" key={index}>
                <IonCardHeader>
                  <IonCardTitle>{activity.title}</IonCardTitle>
                  <IonCardSubtitle>{activity.type}</IonCardSubtitle>
                </IonCardHeader>
                <p>Lieu : {activity.place}</p>
                <p>Nombre de places : {activity.nbrPlace}</p>
                <p>Durée : {activity.duree} heures</p>
                <IonButton expand="block" color="primary">
                  Voir les détails
                </IonButton>
              </IonCardContent>
            ))}
          </IonCard>
        </div>
      </IonContent>
      {loading && (
        <div className="loading">
          <IonSpinner name="crescent" />
          <p>Chargement des activités...</p>
        </div>
      )}
      {error && (
        <div className="error">
          <p>Erreur : {error}</p>
        </div>
      )}
    </IonPage>
  );
}
