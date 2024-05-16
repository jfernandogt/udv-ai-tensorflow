import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobileNet from '@tensorflow-models/mobilenet';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  recognizedClass: string;
  probability: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    const srcData = `data:image/png;base64, ${photo.base64String}`;
    let model = await cocoSsd.load();
    let mobilenetModel = await mobileNet.load();
    const oImg = document.createElement("img");
    oImg.setAttribute('width', '205px');
    oImg.setAttribute('height', '105px');
    oImg.setAttribute('src', srcData);
    await model.detect(oImg);
    const recognizedResults = await mobilenetModel.classify(oImg);
    const recognizedClass = recognizedResults[0]?.className ?? 'Desconocido';
    const probability = (Math.round(recognizedResults[0]?.probability * 100)).toFixed(2);

    const fileName = Date.now() + ".jpeg";
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: srcData,
        recognizedClass,
        probability
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
  };
}
