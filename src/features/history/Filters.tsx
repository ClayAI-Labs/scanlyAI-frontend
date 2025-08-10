import React, { useState } from 'react';
import { HistoryFilters } from '../../types';
import { Card } from '../../components/Card';
import { Filter, X } from 'lucide-react';

interface FiltersProps {
  onFiltersChange: (filters: HistoryFilters) => void;
}

export function Filters({ onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState<HistoryFilters>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof HistoryFilters, value: string | number) => {
    let processedValue: string | number | undefined = value;
    
    // Handle number inputs more carefully
    if (key === 'minAmount' || key === 'maxAmount') {
      if (typeof value === 'string') {
        // Only convert to number if it's a valid number, otherwise keep as undefined
        const numValue = parseFloat(value);
        processedValue = isNaN(numValue) ? undefined : numValue;
      }
    } else {
      // For string inputs, convert empty strings to undefined
      processedValue = value === '' ? undefined : value;
    }

    const newFilters = {
      ...filters,
      [key]: processedValue,
    };
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-medium text-gray-800 hover:text-violet-600 transition-colors"
          >
            Filters
          </button>
          {hasActiveFilters && (
            <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date From
            </label>
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date To
            </label>
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merchant
            </label>
            <input
              type="text"
              placeholder="Filter by merchant"
              value={filters.merchant || ''}
              onChange={(e) => handleFilterChange('merchant', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Amount
              </label>
              <input
                type="number"
                step="1.00"
                placeholder="0.00"
                value={filters.minAmount !== undefined ? filters.minAmount : ''}
                onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Amount
              </label>
              <input
                type="number"
                step="1.00"
                placeholder="999.99"
                value={filters.maxAmount !== undefined ? filters.maxAmount : ''}
                onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}