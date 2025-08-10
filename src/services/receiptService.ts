import { axiosClient } from './axiosClient';
import { Receipt, ExtractedReceipt, HistoryFilters } from '../types';

export const receiptService = {
  async extractReceipt(file: File): Promise<ExtractedReceipt> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosClient.post('/extract', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getReceipts(filters?: HistoryFilters): Promise<Receipt[]> {
    const response = await axiosClient.get('/receipts', { params: filters });
    return response.data;
  },

  async getReceiptById(id: string): Promise<Receipt> {
    const response = await axiosClient.get(`/receipts/${id}`);
    return response.data;
  },

  async deleteReceipt(id: string): Promise<void> {
    await axiosClient.delete(`/receipts/${id}`);
  },

  async saveReceipt(extractedData: ExtractedReceipt): Promise<Receipt> {
    // NOTE: This function is currently not used because the /extract endpoint
    // already saves the receipt automatically. If you want to implement manual
    // saving in the future, you would need to create a POST /receipts endpoint
    // in the backend that accepts ExtractedReceipt data.
    const response = await axiosClient.post('/receipts', extractedData);
    return response.data;
  },
};