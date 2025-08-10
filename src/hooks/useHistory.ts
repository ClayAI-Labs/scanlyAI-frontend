import { useState, useEffect } from 'react';
import { receiptService } from '../services/receiptService';
import { Receipt, HistoryFilters } from '../types';

export function useHistory() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<HistoryFilters>({});

  const fetchReceipts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Don't send filters to backend since it doesn't support them
      const data = await receiptService.getReceipts();
      setReceipts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch receipts';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteReceipt = async (id: string) => {
    try {
      await receiptService.deleteReceipt(id);
      setReceipts(prev => prev.filter(receipt => receipt.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete receipt';
      setError(message);
      throw err;
    }
  };

  const updateFilters = (newFilters: HistoryFilters) => {
    setFilters(newFilters);
    // No need to refetch, filtering will be done client-side
  };

  // Client-side filtering
  const filteredReceipts = receipts.filter(receipt => {
    // Date from filter
    if (filters.dateFrom) {
      const receiptDate = new Date(receipt.date);
      const filterDate = new Date(filters.dateFrom);
      if (receiptDate < filterDate) return false;
    }

    // Date to filter
    if (filters.dateTo) {
      const receiptDate = new Date(receipt.date);
      const filterDate = new Date(filters.dateTo);
      if (receiptDate > filterDate) return false;
    }

    // Merchant filter
    if (filters.merchant) {
      if (!receipt.merchant.toLowerCase().includes(filters.merchant.toLowerCase())) {
        return false;
      }
    }

    // Min amount filter
    if (filters.minAmount !== undefined) {
      if (receipt.total < filters.minAmount) return false;
    }

    // Max amount filter
    if (filters.maxAmount !== undefined) {
      if (receipt.total > filters.maxAmount) return false;
    }

    return true;
  });

  useEffect(() => {
    fetchReceipts();
  }, []);

  return {
    receipts: filteredReceipts,
    loading,
    error,
    filters,
    fetchReceipts,
    deleteReceipt,
    updateFilters,
  };
}