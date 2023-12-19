import axios from "axios";

export async function uploadImages(files, onUploadStart, onUploadSuccess, onUploadError) {
    if (files && files.length > 0) {
        onUploadStart();

        const formData = new FormData();
        for (const file of files) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post('/api/upload', formData);
            onUploadSuccess(response.data.links);
        } catch (error) {
            onUploadError(error);
        }
    }
}
