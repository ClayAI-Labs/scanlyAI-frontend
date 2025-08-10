import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt } from '../../types';
import { Card } from '../../components/Card';
import { 
  Store, 
  Calendar, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  Trash2,
  Loader2,
  AlertTriangle
} from 'lucide-react';

interface ReceiptItemProps {
  receipt: Receipt;
  onDelete: (id: string) => Promise<void>;
}

export function ReceiptItem({ receipt, onDelete }: ReceiptItemProps) {
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(receipt.id);
    } catch (error) {
      console.error('Failed to delete receipt:', error);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 grid sm:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Store className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Merchant</p>
              <p className="font-semibold text-gray-800">{receipt.merchant}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sky-100 rounded-lg">
              <Calendar className="h-4 w-4 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(receipt.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-gray-800">
                {receipt.currency} {receipt.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ShoppingCart className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p className="font-semibold text-gray-800">{receipt.items.length}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Link
            to={`/receipt/${receipt.id}`}
            className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
            title="View Receipt"
          >
            <Eye className="h-4 w-4" />
          </Link>

          {showConfirm ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Confirm Delete"
              >
                {deleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cancel"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Receipt"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}