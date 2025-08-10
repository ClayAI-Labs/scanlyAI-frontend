import React, { useState } from 'react';
import { useHistory } from '../../hooks/useHistory';
import { ReceiptItem } from './ReceiptItem';
import { Filters } from './Filters';
import { StatsCards } from './StatsCards';
import { Card } from '../../components/Card';
import { History, Search, Download, Loader2 } from 'lucide-react';

export function HistoryMain() {
  const { receipts, loading, error, deleteReceipt, updateFilters } = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReceipts = receipts.filter(receipt =>
    receipt.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    try {
      console.log('Starting CSV export...', { filteredReceipts: filteredReceipts.length });
      
      // Create detailed CSV with all items
      const csvData = [
        ['Receipt ID', 'Date', 'Merchant', 'Receipt Total', 'Currency', 'Item Name', 'Quantity', 'Unit Price', 'Item Total', 'Category', 'Scanned Date']
      ];

      filteredReceipts.forEach((receipt, receiptIndex) => {
        console.log(`Processing receipt ${receiptIndex + 1}:`, receipt.id);
        
        if (receipt.items && receipt.items.length > 0) {
          // Add each item as a separate row
          receipt.items.forEach((item, itemIndex) => {
            console.log(`  Processing item ${itemIndex + 1}:`, item.name);
            csvData.push([
              receipt.id || 'N/A',
              receipt.date ? new Date(receipt.date).toLocaleDateString() : 'N/A',
              receipt.merchant || 'N/A',
              receipt.total ? receipt.total.toString() : '0',
              receipt.currency || 'USD',
              item.name || 'Unknown Item',
              item.quantity ? item.quantity.toString() : '0',
              item.unitPrice ? item.unitPrice.toFixed(2) : '0.00',
              item.totalPrice ? item.totalPrice.toFixed(2) : '0.00',
              item.category || 'N/A',
              receipt.createdAt ? new Date(receipt.createdAt).toLocaleDateString() : 'N/A'
            ]);
          });
        } else {
          // If no items, still show receipt info with empty item columns
          csvData.push([
            receipt.id || 'N/A',
            receipt.date ? new Date(receipt.date).toLocaleDateString() : 'N/A',
            receipt.merchant || 'N/A',
            receipt.total ? receipt.total.toString() : '0',
            receipt.currency || 'USD',
            'No items',
            '0',
            '0.00',
            '0.00',
            'N/A',
            receipt.createdAt ? new Date(receipt.createdAt).toLocaleDateString() : 'N/A'
          ]);
        }
      });

      console.log('CSV data prepared:', csvData.length, 'rows');

      // Convert to CSV string with proper escaping for commas in data
      const csvContent = csvData.map(row => 
        row.map(field => {
          const fieldStr = String(field);
          // Escape fields that contain commas, quotes, or newlines
          if (fieldStr.includes(',') || fieldStr.includes('"') || fieldStr.includes('\n')) {
            return `"${fieldStr.replace(/"/g, '""')}"`;
          }
          return fieldStr;
        }).join(',')
      ).join('\n');

      console.log('CSV content prepared, length:', csvContent.length);

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipts-detailed-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      
      console.log('Triggering download...');
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('CSV export completed successfully!');
    } catch (error) {
      console.error('Error during CSV export:', error);
      alert('Error exporting CSV: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
          <span className="text-gray-600">Loading receipts...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg">
            <History className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
              Receipt History
            </h1>
            <p className="text-gray-600">Manage and export your scanned receipts</p>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={filteredReceipts.length === 0}
          className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-2 px-4 rounded-lg hover:from-sky-600 hover:to-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats */}
      <StatsCards receipts={receipts} />

      {/* Filters */}
      <Filters onFiltersChange={updateFilters} />

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by merchant name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
          />
        </div>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading receipts: {error}</p>
          </div>
        </Card>
      )}

      {/* Receipts List */}
      {filteredReceipts.length > 0 ? (
        <div className="grid gap-4">
          {filteredReceipts.map((receipt) => (
            <ReceiptItem
              key={receipt.id}
              receipt={receipt}
              onDelete={deleteReceipt}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="text-center">
            <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {searchTerm ? 'No matching receipts' : 'No receipts found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms or filters.'
                : 'Start by uploading your first receipt on the home page.'
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}