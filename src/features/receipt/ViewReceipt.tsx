import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { receiptService } from '../../services/receiptService';
import { Receipt } from '../../types';
import { Card } from '../../components/Card';
import { 
  Store, 
  Calendar, 
  DollarSign, 
  ShoppingCart, 
  ArrowLeft,
  Loader2,
  AlertCircle,
  Trash2
} from 'lucide-react';

export function ViewReceipt() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchReceipt = async () => {
      if (!id) return;
      
      try {
        const data = await receiptService.getReceiptById(id);
        setReceipt(data);
      } catch (err) {
        setError('Failed to load receipt');
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [id]);

  const handleDelete = async () => {
    if (!receipt || !window.confirm('Are you sure you want to delete this receipt?')) {
      return;
    }

    setDeleting(true);
    try {
      await receiptService.deleteReceipt(receipt.id);
      navigate('/history', { 
        state: { message: 'Receipt deleted successfully!' }
      });
    } catch (err) {
      setError('Failed to delete receipt');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
          <span className="text-gray-600">Loading receipt...</span>
        </div>
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Receipt Not Found</h2>
        <p className="text-gray-600 mb-6">{error || 'The requested receipt could not be found.'}</p>
        <Link
          to="/history"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-2 rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to History</span>
        </Link>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/history"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to History</span>
        </Link>
        
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          <span>Delete</span>
        </button>
      </div>

      {/* Receipt Details */}
      <Card className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Receipt Details</h1>
        
        {/* Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center space-x-3 p-4 bg-violet-50 rounded-lg">
            <Store className="h-6 w-6 text-violet-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Merchant</p>
              <p className="text-lg font-bold text-gray-800">{receipt.merchant}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-sky-50 rounded-lg">
            <Calendar className="h-6 w-6 text-sky-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Date</p>
              <p className="text-lg font-bold text-gray-800">
                {new Date(receipt.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg">
            <DollarSign className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Total</p>
              <p className="text-lg font-bold text-gray-800">
                {receipt.currency} {receipt.total.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-emerald-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">Items</p>
              <p className="text-lg font-bold text-gray-800">{receipt.items.length}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Purchased Items</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Item Name</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Quantity</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Unit Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Price</th>
                  {receipt.items.some(item => item.category) && (
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Category</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item, index) => (
                  <tr key={item.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-800 font-medium">{item.name}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{item.quantity}</td>
                    <td className="py-4 px-4 text-right text-gray-600">
                      {receipt.currency} {item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-800">
                      {receipt.currency} {item.totalPrice.toFixed(2)}
                    </td>
                    {receipt.items.some(item => item.category) && (
                      <td className="py-4 px-4 text-center">
                        {item.category && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
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
        </div>

        {/* Receipt Metadata */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="text-sm text-gray-500 space-y-1">
            <p>Receipt ID: {receipt.id}</p>
            <p>Scanned on: {new Date(receipt.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}