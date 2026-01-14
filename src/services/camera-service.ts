import { CameraCapturedPicture, CameraView } from 'expo-camera';

let cameraRef: CameraView | null = null;

export function setCameraRef(ref: CameraView | null) {
  cameraRef = ref;
}

export async function takePhoto(): Promise<CameraCapturedPicture> {
  if (!cameraRef) {
    throw new Error('Camera não inicializada');
  }

  return await cameraRef.takePictureAsync({
    quality: 0.8,
    base64: false,
  });
}
