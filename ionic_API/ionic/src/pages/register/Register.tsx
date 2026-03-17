import React from "react";
import {
  IonHeader,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useState } from "react";
import { register } from "../../services/authServices";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  async function handleSubmit() {
    if (!email || !name || !password) {
      setAlertMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await register(email, name, password);
      setAlertMessage("Inscription réussie !");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlertMessage(`Erreur : ${error.message}`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="auto">
              <IonBackButton defaultHref="/Tab1" />
            </IonCol>
            <IonCol>
              <IonTitle className="registerTitle">Création de compte</IonTitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLabel position="floating">Votre pseudo</IonLabel>
        <IonInput
          type="text"
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
        ></IonInput>

        <IonLabel position="floating">Votre adresse e-mail</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        ></IonInput>

        <IonLabel position="floating">Votre mot de passe</IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonInput={(e) => setPassword(e.detail.value!)}
        ></IonInput>

        <p>{alertMessage}</p>

        <button className="registerButton" onClick={handleSubmit}>
          S'inscrire
        </button>
      </IonContent>
    </IonPage>
  );
}
