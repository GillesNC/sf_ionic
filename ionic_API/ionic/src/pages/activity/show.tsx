import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import {
  IonContent,
  IonSpinner,
} from "@ionic/react";
import { show } from "../../services/activityServices";
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
    const [activity, setActivity] = useState<Activity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
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

        fetchActivity();
    }, [id, history]);

    return (
        <IonContent className="ion-padding">
            {loading ? (
                <div className="spinner-container">
                    <IonSpinner name="crescent" />
                </div>
            ) : activity ? (
                <div className="activity-detail-card">
                    <h2>{activity.title}</h2>
                    <p><strong>Description:</strong> {activity.description}</p>
                    <p><strong>Type:</strong> {activity.type}</p>
                    <p><strong>Lieu:</strong> {activity.place}</p>
                    <p><strong>Nombre de places:</strong> {activity.nbrPlace}</p>
                    <p><strong>Durée:</strong> {activity.duree} heures</p>
                </div>
            ) : (
                <p>Activité non trouvée.</p>
            )}
        </IonContent>
    );
}