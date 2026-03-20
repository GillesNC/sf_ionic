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
import { getMyActivities } from "../../services/activityServices";
import "./Activity.css";
import { useAuth } from "../../contexts/AuthContext";

interface Activity {
  id: string;
  title: string;
  description: string;
  place: string;
  nbrPlace: number;
  duree: number;
  type: string;
}

export default function MyActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const activities = async () => {
      try {
        if (user) {
          const data = await getMyActivities();
          setActivities(data);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    activities();
  }, [user]);

  return (
    <IonContent className="ion-padding">
      <h2 className="activity-title">Mes activités</h2>

      {user && (
        <>
          <IonAccordionGroup className="accordion-container">
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <IonAccordion key={index} value={`activity-${index}`}>
                  <IonItem slot="header">
                    <IonLabel>{activity.title}</IonLabel>
                  </IonItem>
                  <div className="accordion-content" slot="content">
                    <p>
                      <strong>Type :</strong> {activity.type || "N/A"}
                    </p>
                    <p>
                      <strong>Description :</strong>{" "}
                      {activity.description || "N/A"}
                    </p>
                    <p>
                      <strong>Lieu :</strong> {activity.place}
                    </p>
                    <p>
                      <strong>Nombre de places :</strong>{" "}
                      {activity.nbrPlace || "N/A"}
                    </p>
                    <div>
                      <IonButton
                        className="edit-button"
                        routerLink={`/edit-activity/${activity.id}`}
                      >
                        Modifier
                      </IonButton>
                      <IonButton
                        fill="outline"
                        color="danger"
                        className="delete-button"
                        routerLink={`/delete-activity/${activity.id}`}
                      >
                        Supprimer
                      </IonButton>
                    </div>
                  </div>
                </IonAccordion>
              ))
            ) : (
              <p>Aucune activité trouvée.</p>
            )}
          </IonAccordionGroup>
          <div className="add-activity-container">
            <p>Vous souhaitez ajouter une nouvelle activité ?</p>
            <IonButton
              className="add-activity-button"
              routerLink="/add-activity"
            >
              Ajouter une activité
            </IonButton>
          </div>
        </>
      )}

      {!user && (
        <div className="not-authenticated">
          <p>Veuillez vous connecter pour voir vos activités.</p>
          <IonButton routerLink="/login">Se connecter</IonButton>
        </div>
      )}

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
    </IonContent>
  );
}
