import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minha-api.com',
});

export async function sendImageToApi(imageUri: string) {
  const formData = new FormData();

  formData.append('image', {
    uri: imageUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  } as any);

  return api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
