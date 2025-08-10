import React from 'react';
import { Receipt } from '../../types';
import { Card } from '../../components/Card';
import { DollarSign, FileText, Store, Calendar } from 'lucide-react';

interface StatsCardsProps {
  receipts: Receipt[];
}

export function StatsCards({ receipts }: StatsCardsProps) {
  const totalAmount = receipts.reduce((sum, receipt) => sum + receipt.total, 0);
  const totalReceipts = receipts.length;
  const uniqueMerchants = new Set(receipts.map(receipt => receipt.merchant)).size;
  
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const thisMonthReceipts = receipts.filter(receipt => {
    const receiptDate = new Date(receipt.date);
    return receiptDate.getMonth() === thisMonth && receiptDate.getFullYear() === thisYear;
  }).length;

  const stats = [
    {
      title: 'Total Amount',
      value: `$${totalAmount.toFixed(2)}`,
      icon: DollarSign,
      color: 'indigo',
    },
    {
      title: 'Total Receipts',
      value: totalReceipts.toString(),
      icon: FileText,
      color: 'violet',
    },
    {
      title: 'Unique Merchants',
      value: uniqueMerchants.toString(),
      icon: Store,
      color: 'sky',
    },
    {
      title: 'This Month',
      value: thisMonthReceipts.toString(),
      icon: Calendar,
      color: 'emerald',
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} hover className="p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}