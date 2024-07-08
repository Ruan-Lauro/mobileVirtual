import { Alert, Share } from 'react-native';

export type Message = {
    message: string,
    media?: string[],
}

type Document = {
    file: string,
    name: string,
}

export async function shareContent({ message, media }: Message) {

    const images: string[] = []
    const videos: string[] = []
    const pdfs: Document[] = []


    async function share(info: string) {
        try {
            const result = await Share.share({ message: info })
            if (result.action === Share.sharedAction) {
               
            } else if (result.action === Share.dismissedAction) {
               
            }
        } catch (error: any) {
            Alert.alert('Erro de compartilhamento', error.message)
        }
    }

   
    if (media && media.length > 0) {
        media.forEach((mediaValue, index) => {
            if (mediaValue === 'img' && media[index + 1]) {
                images.push(media[index + 1])
            } else if (mediaValue === 'video' && media[index + 1]) {
                videos.push(media[index + 1])
            } else if (mediaValue === 'doc' && media[index + 1]) {
                const [file, name] = media[index + 1].split(',')
                pdfs.push({ name, file })
            }
        });
    } else {
        try {
            const result = await Share.share({ message });
            if (result.action === Share.sharedAction) {
           
            } else if (result.action === Share.dismissedAction) {
              
            }
        } catch (error: any) {
            Alert.alert('Erro de compartilhamento', error.message)
        }
        return;
    }

    let info = `${message}\n`
    if (images.length > 0) info += `\nImagens: ${images.join(', ')}\n`
    if (videos.length > 0) info += `\nVídeos: ${videos.join(', ')}\n`
    if (pdfs.length > 0) info += `\nPDF: ${pdfs.map(pdf => `${pdf.name}: ${pdf.file}`).join(', ')}\n`

    share(info);
}
