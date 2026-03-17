import { useState } from "react";
import { login } from "../../services/authServices";
import { useAuth } from "../../hooks/useAuth";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonToast,
} from "@ionic/react";
import {
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { setIsLoggedIn, setUserId } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      setAlertMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const data = await login(email, password);
      setIsLoggedIn(true);
      setUserId(data.id);
      setAlertMessage("Connexion réussie !");
      history.push(`/profil/${data.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setAlertMessage(`Erreur : ${error.message}`);
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="login-container">
          <h2 className="login-title">Se connecter</h2>
          <p>Bienvenue ! Connectez-vous pour accéder à votre compte.</p>
          <div className="login-card">
            <div className="login-field-label">
              <span>Adresse email</span>
            </div>
            <div className="login-input-wrapper">
              <IonInput
                type="email"
                placeholder="nom@exemple.com"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </div>

            <div className="login-field-label">
              <span>Mot de passe</span>
            </div>
            <div className="login-input-wrapper">
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
