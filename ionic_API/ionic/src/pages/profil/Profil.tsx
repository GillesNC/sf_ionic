import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import { useState } from 'react';
import './Profil.css';

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export default function Profil() {
  const []

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
            <IonTitle size="large">Mon profil</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Mon profil" />
      </IonContent>
    </IonPage>
  );
};
