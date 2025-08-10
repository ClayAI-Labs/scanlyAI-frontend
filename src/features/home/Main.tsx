import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UploadForm } from './UploadForm';
import { ExtractedTable } from './ExtractedTable';
import { useExtract } from '../../hooks/useExtract';
import { Card } from '../../components/Card';
import { 
  ScanLine, 
  Upload, 
  Sparkles, 
  FileText, 
  Shield, 
  History,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Download,
  Lock
} from 'lucide-react';

export function HomeMain() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { extractedData, loading, error, extractReceipt, reset } = useExtract();
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setCurrentFile(file);
    try {
      await extractReceipt(file);
    } catch (err) {
      console.error('Extraction failed:', err);
    }
  };

  const handleUploadClick = () => {
    if (!user) {
      navigate('/login');
    }
  };

  const handleReset = () => {
    reset();
    setCurrentFile(null);
  };

  if (extractedData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ExtractedTable 
            data={extractedData} 
            onReset={handleReset}
            fileName={currentFile?.name}
          />
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl">
                <ScanLine className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                Receipt Scanner
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Upload your receipt image or PDF and let our AI extract all the important details automatically. 
              Perfect for expense tracking and record keeping.
            </p>
          </div>

          <UploadForm onFileUpload={handleFileUpload} loading={loading} error={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-indigo-800 to-sky-700 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-sky-500/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-3 mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <ScanLine className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold">
                ScanlyAI
              </h1>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Scan. Analyze. Organize.
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Turn receipts into structured intelligence with AI-powered extraction and smart organization.
            </p>
            
            <button
              onClick={handleUploadClick}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-2xl hover:from-sky-600 hover:to-sky-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-sky-500/25 text-lg font-semibold"
            >
              <Upload className="h-6 w-6" />
              <span>Upload Receipt</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <p className="text-white/70 mt-4 text-sm">
              {!user && "Sign up to get started - it's free!"}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage receipts efficiently and securely
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 text-center group" hover>
                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Instant Extraction</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered OCR extracts merchant, date, total, and line items in seconds
                </p>
              </Card>
              
              <Card className="p-8 text-center group" hover>
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">CSV Export</h3>
                <p className="text-gray-600 leading-relaxed">
                  Export your receipt data to CSV for accounting software and expense reports
                </p>
              </Card>
              
              <Card className="p-8 text-center group" hover>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data is encrypted and processed securely with enterprise-grade protection
                </p>
              </Card>
              
              <Card className="p-8 text-center group" hover>
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <History className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Smart History</h3>
                <p className="text-gray-600 leading-relaxed">
                  Search, filter, and organize your receipts with intelligent categorization
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple 4-step process to digitize your receipts
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Upload, title: 'Upload', desc: 'Drop your receipt image or PDF' },
                { icon: Sparkles, title: 'Extract', desc: 'AI processes and extracts data' },
                { icon: CheckCircle, title: 'Review', desc: 'Verify extracted information' },
                { icon: FileText, title: 'Search', desc: 'Find receipts instantly' }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent mb-6">
              Your Privacy Matters
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We believe in transparency and user control. Your receipt data is processed securely 
              and stored only with your explicit consent.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">No Data Stored Without Consent</h3>
                  <p className="text-gray-600">You control what gets saved and what gets deleted</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Encrypted Processing</h3>
                  <p className="text-gray-600">All data is encrypted in transit and at rest</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Export-Only Design</h3>
                  <p className="text-gray-600">Your data belongs to you - export anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section—temporarily commented out */}
      {/*
      <section className="py-24 bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent mb-6">
                Loved by Users
              </h2>
              <p className="text-xl text-gray-600">
                See what people are saying about ScanlyAI
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "ScanlyAI has revolutionized how I handle expense reports. What used to take hours now takes minutes!",
                  author: "Sarah Chen",
                  role: "Freelance Consultant"
                },
                {
                  quote: "The accuracy is incredible. It catches details I would have missed manually entering receipts.",
                  author: "Marcus Rodriguez",
                  role: "Small Business Owner"
                },
                {
                  quote: "Finally, a receipt scanner that actually works reliably. The CSV export feature is a game-changer.",
                  author: "Emily Watson",
                  role: "Accountant"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-8" hover>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Start simplifying your receipts today
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of users who have streamlined their expense tracking with ScanlyAI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center space-x-3 bg-white text-violet-600 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl font-semibold text-lg"
              >
                <Upload className="h-6 w-6" />
                <span>Get Started Free</span>
              </button>
              
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex items-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-violet-600 transition-all transform hover:scale-105 font-semibold text-lg"
              >
                <span>Create Account</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}