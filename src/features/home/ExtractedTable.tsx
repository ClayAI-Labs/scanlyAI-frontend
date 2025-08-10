import { useNavigate } from 'react-router-dom';
import { ExtractedReceipt } from '../../types';
import { Card } from '../../components/Card';
import { 
  X, 
  Store, 
  Calendar, 
  DollarSign, 
  ShoppingCart,
  CheckCircle
} from 'lucide-react';

interface ExtractedTableProps {
  data: ExtractedReceipt;
  onReset: () => void;
  fileName?: string;
}

export function ExtractedTable({ data, onReset, fileName }: ExtractedTableProps) {
  const navigate = useNavigate();

  // Validate and sanitize data to prevent runtime errors
  const sanitizeData = (data: ExtractedReceipt): ExtractedReceipt => {
    return {
      merchant: data.merchant || 'Unknown Merchant',
      date: data.date || new Date().toISOString().split('T')[0],
      total: typeof data.total === 'number' ? data.total : 0,
      currency: data.currency || 'USD',
      items: (data.items || []).map(item => ({
        name: item.name || 'Unknown Item',
        quantity: typeof item.quantity === 'number' ? item.quantity : 1,
        unitPrice: typeof item.unitPrice === 'number' ? item.unitPrice : 0,
        totalPrice: typeof item.totalPrice === 'number' ? item.totalPrice : 0,
        category: item.category
      }))
    };
  };

  const sanitizedData = sanitizeData(data);

  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Extracted Receipt Data</h2>
          {fileName && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {fileName}
            </span>
          )}
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-violet-50 rounded-lg">
            <Store className="h-5 w-5 text-violet-600" />
            <div>
              <p className="text-sm text-gray-600">Merchant</p>
              <p className="font-semibold text-gray-800">{sanitizedData.merchant}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-sky-50 rounded-lg">
            <Calendar className="h-5 w-5 text-sky-600" />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(sanitizedData.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-gray-800">
                {sanitizedData.currency} {(typeof sanitizedData.total === 'number' ? sanitizedData.total : 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Items Table */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <ShoppingCart className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Items ({sanitizedData.items.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Qty</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Unit Price</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                {sanitizedData.items.some(item => item.category) && (
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Category</th>
                )}
              </tr>
            </thead>
            <tbody>
              {sanitizedData.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{item.name}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{item.quantity || 0}</td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {sanitizedData.currency} {(typeof item.unitPrice === 'number' ? item.unitPrice : 0).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-800">
                    {sanitizedData.currency} {(typeof item.totalPrice === 'number' ? item.totalPrice : 0).toFixed(2)}
                  </td>
                  {sanitizedData.items.some(item => item.category) && (
                    <td className="py-3 px-4 text-center">
                      {item.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {item.category}
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Success Message */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3 text-green-700">
        <CheckCircle className="h-5 w-5" />
        <span>Receipt has been successfully saved to your history!</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleViewHistory}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <CheckCircle className="h-5 w-5" />
          <span>View History</span>
        </button>
        
        <button
          onClick={onReset}
          className="flex-1 sm:flex-initial bg-white text-gray-700 py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-2"
        >
          <X className="h-5 w-5" />
          <span>Upload New</span>
        </button>
      </div>
    </div>
  );
}