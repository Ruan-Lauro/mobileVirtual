import { Cloudinary } from "@cloudinary/url-gen";
import axios from 'axios';

type response =  {
    access_mode: string;
    asset_id: string;
    bytes: number;
    created_at: Date;
    etag: string;
    existing: boolean;
    folder: string;
    format: string;
    height: number;
    original_filename: string;
    placeholder: boolean;
    public_id: string;
    resource_type: string;
    secure_url:string;
    signature: string;
    tags: [];
    type: string;
    url: string;
    version: number;
    version_id: string;
    width: number;
  }

export default async function cloudinary(uri:string){

    const cloudName = 'dfmdiobwa';
    const uploadPreset = 'ml_default';

    const formData = new FormData();
    formData.append('file', {
        uri: uri,
        type: 'application/octet-stream', 
        name: 'upload',
    });
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Erro no upload:', error);
        throw error;
    }
    
    
    
}









