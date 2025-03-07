import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

interface NewDocument {
  title: string;
  content: string;
}

interface DocumentResponse {
  id: string;
  title: string;
  content: string;
}

const useCreateDocument = () => {
  return useMutation<AxiosResponse<DocumentResponse>, Error, NewDocument>({
    mutationFn: (newDocument: NewDocument) => axios.post('/api/document/create', newDocument),
    onSuccess: (response) => {
      console.log("API response:", response.data);
    },
    onError: (error) => {
      console.error('Error creating document:', error.message);
    },
  });
};

export default useCreateDocument;