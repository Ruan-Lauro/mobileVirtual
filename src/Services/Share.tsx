import { Alert, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export type Message = {
  message: string,
  media?: string[],
}

type Document = {
  file: string,
  name: string,
}

export async function shareContent({ message, media }: Message) {
  const images: string[] = [];
  const videos: string[] = [];
  const pdfs: Document[] = [];

  async function downloadAndShareFile(url: string, fileType: string) {
    try {
      const fileUri = FileSystem.documentDirectory! + url.split('/').pop();
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Compartilhamento não disponível', 'O compartilhamento direto não está disponível no seu dispositivo.');
      }
    } catch (error: any) {
      Alert.alert(`Erro ao baixar o ${fileType}`, error.message);
    }
  }

  async function share(info: string) {
    try {
      const result = await Share.share({ message: info });
      if (result.action === Share.sharedAction) {
      
      } else if (result.action === Share.dismissedAction) {
       
      }
    } catch (error: any) {
      Alert.alert('Erro de compartilhamento', error.message);
    }
  }

  if (media && media.length > 0) {
    media.forEach((mediaValue, index) => {
      if (mediaValue === 'img' && media[index + 1]) {
        images.push(media[index + 1]);
      } else if (mediaValue === 'video' && media[index + 1]) {
        videos.push(media[index + 1]);
      } else if (mediaValue === 'doc' && media[index + 1]) {
        const [file, name] = media[index + 1].split(',');
        pdfs.push({ name, file });
      }
    });
  } else {
    try {
      const result = await Share.share({ message });
      if (result.action === Share.sharedAction) {
       
      } else if (result.action === Share.dismissedAction) {
        
      }
    } catch (error: any) {
      Alert.alert('Erro de compartilhamento', error.message);
    }
    return;
  }

  let info = `${message}\n`;
 

  if (images.length > 0) {
    await Promise.all(images.map(url => downloadAndShareFile(url, 'imagem')));
  }
  if (videos.length > 0) {
    await Promise.all(videos.map(url => downloadAndShareFile(url, 'vídeo')));
  }
  if (pdfs.length > 0) {
    await Promise.all(pdfs.map(pdf => downloadAndShareFile(pdf.file, 'PDF')));
  } else if (images.length === 0 && videos.length === 0 && pdfs.length === 0) {
    share(info);
  }
  share(info)
}



