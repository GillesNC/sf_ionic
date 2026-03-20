import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonContent,
  IonSpinner,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonModal,
  IonButtons,
} from "@ionic/react";
import { show, deleteActivity } from "../../services/activityServices";
import { useAuth } from "../../contexts/AuthContext";
import "./Activity.css";

interface Activity {
  id: string;
  title: string;
  description: string;
  place: string;
  nbrPlace: number;
  duree: number;
  type: string;
}

export default function DetailActivity() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { user } = useAuth();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const response = async () => {
      try {
        const data = await show(id);
        setActivity(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'activité :", error);
        history.push("/homepage");
      } finally {
        setLoading(false);
      }
    };

    response();
  }, [id, history]);

  const handleDelete = async () => {
    try {
      await deleteActivity(id);
      setAlertMessage("Activité supprimée avec succès !");
      history.push("/my-activity");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlertMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Activité</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <div className="spinner-container">
            <IonSpinner name="crescent" />
          </div>
        ) : activity ? (
          <div className="card-activity">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{activity.title}</IonCardTitle>
                <IonCardSubtitle>Type: {activity.type}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="activity-card">
                <p>
                  <strong>Description:</strong> {activity.description}
                </p>
                <p>
                  <strong>Lieu:</strong> {activity.place}
                </p>
                <p>
                  <strong>Nombre de places:</strong> {activity.nbrPlace}
                </p>
                <p>
                  <strong>Durée:</strong> {activity.duree} minutes
                </p>
              </IonCardContent>
            </IonCard>
            {user && (
              <div className="button-group">
                <IonButton
                  className="edit-button"
                  routerLink={`/edit-activity/${activity.id}`}
                  expand="block"
                  color="primary"
                >
                  Modifier l'activité
                </IonButton>
                <IonButton
                  fill="outline"
                  expand="block"
                  color="danger"
                  className="delete-button"
                  onClick={async () => setIsOpen(true)}
                >
                  Supprimer
                </IonButton>
              </div>
            )}

            <div>
              <IonButton routerLink="/homepage" expand="block" color="medium">
                Retour à la homepage
              </IonButton>
            </div>
          </div>
        ) : (
          <p>Activité non trouvée.</p>
        )}

        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>
              Êtes-vous sûr de vouloir supprimer cette activité ? Cette action
              est irréversible.
            </p>
            <IonButton
              color="danger"
              expand="block"
              onClick={async () => {
                await handleDelete();
                setIsOpen(false);
              }}
            >
              Supprimer
            </IonButton>
            <IonButton
              fill="outline"
              color="medium"
              expand="block"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </IonButton>
            <p>{alertMessage}</p>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
