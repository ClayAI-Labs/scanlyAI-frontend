import { useState } from 'react';
import { receiptService } from '../services/receiptService';
import { ExtractedReceipt } from '../types';

export function useExtract() {
  const [extractedData, setExtractedData] = useState<ExtractedReceipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractReceipt = async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await receiptService.extractReceipt(file);
      setExtractedData(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to extract receipt';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setExtractedData(null);
    setError(null);
  };

  return {
    extractedData,
    loading,
    error,
    extractReceipt,
    reset,
  };
}