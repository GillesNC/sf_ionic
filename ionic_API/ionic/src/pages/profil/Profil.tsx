import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { getProfile } from '../../services/authServices';
import { useAuth } from '../../hooks/useAuth';
import './Profil.css';

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export default function Profil() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoggedIn) {
        try {
          const profileData = await getProfile();
          setUser(profileData);
        } catch (error) {
          console.error("Erreur lors de la récupération du profil :", error);
        }
      }
    };
    fetchProfile();
  }, [isLoggedIn]); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profil</IonTitle>
          </IonToolbar>
        </IonHeader>
        {user ? (
          <div className="profile-container">
            <h2>Bienvenue!</h2>
            <p>Email</p>
          </div>
        ) : (
          <p>Chargement du profil...</p>
        )}
      </IonContent>
    </IonPage>
  );
};
