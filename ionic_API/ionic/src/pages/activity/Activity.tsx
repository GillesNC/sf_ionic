import { useEffect, useState } from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonContent,
  IonSpinner,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { getActivities } from "../../services/authServices";
import "./Activity.css";
import { useAuth } from "../../contexts/AuthContext";

interface Activity {
  title: string;
  type: string | null;
  description: string | null;
  place: string;
  nbrPlace: number | null;
  duree: number | null;
  createdAt: string;
}

export default function Activity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

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
    <IonContent className="ion-padding">
      <h2 className="activity-title">Toutes les activités</h2>

      <IonAccordionGroup className="accordion-container">
        {activities.map((activity, index) => (
          <IonAccordion
            className="accordion-element"
            key={index}
            value={`activity-${index}`}
          >
            <IonItem slot="header">
              <IonLabel>{activity.title}</IonLabel>
            </IonItem>
            <div className="activity-details" slot="content">
              <p>
                <strong>Type:</strong> {activity.type ?? "Aucune catégorie"}
              </p>
              <p>
                <strong>Description:</strong> {activity.description ?? "Aucune description"}
              </p>
              <p>
                <strong>Lieu:</strong> {activity.place}
              </p>
              <p>
                <strong>Places disponibles:</strong> {activity.nbrPlace ?? "Aucune place disponible"}
              </p>
              <p>
                <strong>Durée (min):</strong> {activity.duree ?? "Aucune durée disponible"}
              </p>
            </div>
          </IonAccordion>
        ))}
      </IonAccordionGroup>

      {/* Affichage du spinner de chargement ou du message d'erreur */}
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
      {user && (
        <div>
          <IonButton className="add-activity-button" routerLink="/add-activity">
            Ajouter une activité
          </IonButton>
        </div>
      )}
    </IonContent>
  );
}
