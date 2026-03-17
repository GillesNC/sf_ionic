import { useState } from "react";
import { login } from "../../services/authServices";
import {
  IonBackButton,
  IonHeader,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonToast,
} from "@ionic/react";
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  async function handleLogin() {
    if (!email || !password) {
      setAlertMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await login(email, password);
      setAlertMessage("Connexion réussie !");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlertMessage(`Erreur : ${error.message}`);
    }
  }

  return (
    <IonPage className="login-page">
      <IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="auto">
              <IonBackButton defaultHref="/Tab1" />
            </IonCol>
            <IonCol>
              <IonTitle className="registerTitle">Connexion</IonTitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent className="login-content ion-padding">
        <div className="login-card">
          <div className="login-field-label">
            <span>Adresse email</span>
          </div>
          <div className="login-input-wrapper">
            <IonIcon icon={mailOutline} />
            <IonInput
              type="email"
              placeholder="nom@exemple.com"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </div>

          <div className="login-input-wrapper">
            <IonIcon icon={lockClosedOutline} />
            <IonInput
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
            />
            <button
              className="login-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
            </button>
          </div>

          <IonButton
            expand="block"
            className="login-submit-btn"
            onClick={handleLogin}
          >
            Se connecter
          </IonButton>

          <p className="login-register-link">
            Pas encore de compte ?{" "}
            <a onClick={() => history.push("/register")}>Créer un compte</a>
          </p>
        </div>

        <IonToast
          isOpen={!!alertMessage}
          message={alertMessage}
          duration={3000}
          onDidDismiss={() => setAlertMessage("")}
        />
      </IonContent>
    </IonPage>
  );
}
