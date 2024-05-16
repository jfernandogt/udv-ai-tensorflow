import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonImg,
  IonLabel,
} from "@ionic/react";
import { usePhotoGallery } from "../components/hooks/usePhotoGallery";
import "./Tab1.css";

const Analyzer: React.FC = () => {
  const { photos, takePhoto } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Desde Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Desde Cámara</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonRow>
            <IonCol>
              <IonButton onClick={takePhoto} className="text-center">Tomar Foto / Subir de galería</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={photo.filepath}>
                <IonImg src={photo.webviewPath} />
                <div>
                  <IonLabel>Clase: {photo.recognizedClass}</IonLabel>
                </div>
                <div>
                  <IonLabel>Probabilidad: {photo.probability}%</IonLabel>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Analyzer;
