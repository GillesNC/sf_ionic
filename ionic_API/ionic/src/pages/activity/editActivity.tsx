import { IonContent, IonPage, IonInput, IonButton, IonToast } from "@ionic/react";
import { useState } from "react";
import { editActivity } from "../../services/activityServices";

export default function EditActivity() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [nbrPlace, setNbrPlace] = useState(0);
  const [duree, setDuree] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

    async function handleSubmit() {
    if (!title || !description || !place || nbrPlace <= 0 || duree <= 0) {
      alert("Veuillez remplir les champs obligatoires.");
      return;
    }

    try {
      await editActivity("activityId", {
        title,
        description,
        type,
        place,
        nbrPlace,
        duree,
      });
      setTitle("");
      setDescription("");
      setType("");
      setPlace("");
      setNbrPlace(0);
      setDuree(0);
      setAlertMessage("Activité modifiée avec succès !");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="login-container">
          <h2 className="login-title">Modifier l'activité {title}</h2>
          <p>Modifiez l'activité en remplissant les champs ci-dessous.</p>
          <div className="login-card">
            <div className="login-field-label">
              <span>Titre actuel : {title}</span>
            </div>
            <div className="login-input-wrapper">
              <IonInput
                type="text"
                placeholder="Le nouveau titre de l'activité"
                value={title}
                onIonChange={(e) => setTitle(e.detail.value!)}  
              />
            </div>

            <div className="login-field-label">
              <span>Votre description</span>
            </div>
            <div className="login-input-wrapper">
              <IonInput
                type="text"
                placeholder="Entrez la description de l'activité"
                value={description}
                onIonChange={(e) => setDescription(e.detail.value!)}
              />
            </div>

            <div className="login-field-label">
              <span>Votre type</span>
            </div>
            <div className="login-input-wrapper">
              <IonInput
                type="text"
                placeholder="Entrez le type de l'activité"
                value={type}
                onIonChange={(e) => setType(e.detail.value!)}
              />
            </div>

            <div className="login-field-label">
              <span>Votre lieu</span>
            </div>
            <div className="login-input-wrapper">
              <IonInput
                type="text"
                placeholder="Entrez le lieu de l'activité"
                value={place}
                onIonChange={(e) => setPlace(e.detail.value!)}
              />
            </div>

            <div className="login-field-label">
              <span>Nombre de places</span>
            </div>
            <div className="login-input-wrapper">
              <IonInput
                type="number"
                placeholder="Entrez le nombre de places disponibles"
                value={nbrPlace}
                onIonChange={(e) => setNbrPlace(parseInt(e.detail.value!, 10))}
              />
            </div>

            <div className="login-field-label">
              <span>Durée (en minutes)</span>
            </div>
            <div className="login-input-wrapper">
              <IonInput
                type="number"
                placeholder="Entrez la durée de l'activité"
                value={duree}
                onIonChange={(e) => setDuree(parseInt(e.detail.value!, 10))}
              />
            </div>

            <IonButton className="login-submit-btn" onClick={handleSubmit}>
             Sauvegarder les modifications
            </IonButton>

            <IonToast
              isOpen={!!alertMessage}
              message={alertMessage}
              duration={3000}
              onDidDismiss={() => setAlertMessage("")}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
