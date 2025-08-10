import React from 'react';
import { ScanLine } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-violet-900 via-indigo-800 to-sky-700 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <ScanLine className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">ScanlyAI</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-white/90 text-lg">© 2025 ScanlyAI. All rights reserved.</p>
            <p className="mt-2 text-white/70">Powered by AI for intelligent receipt processing</p>
          </div>
        </div>
      </div>
    </footer>
  );
}