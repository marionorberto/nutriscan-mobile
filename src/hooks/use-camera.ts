import { useState } from 'react';
import { sendImageToApi } from '../services/api-service';
import { takePhoto } from '../services/camera-service';

export function useCamera() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function takePhotoAndSend() {
    try {
      setLoading(true);

      const photo = await takePhoto();
      const response = await sendImageToApi(photo.uri);

      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    takePhotoAndSend,
    loading,
    result,
  };
}
