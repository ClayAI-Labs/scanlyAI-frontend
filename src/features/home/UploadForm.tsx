import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '../../components/Card';
import { Upload, FileText, Image, Loader2, AlertCircle } from 'lucide-react';

interface UploadFormProps {
  onFileUpload: (file: File) => void;
  loading: boolean;
  error: string | null;
}

export function UploadForm({ onFileUpload, loading, error }: UploadFormProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: loading,
  });

  return (
    <Card className="p-8">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
          ${isDragActive 
            ? 'border-sky-400 bg-sky-50' 
            : loading 
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
              : 'border-gray-300 hover:border-sky-400 hover:bg-sky-50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          {loading ? (
            <>
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Processing Receipt</h3>
                <p className="text-gray-500">Our AI is extracting the data from your receipt...</p>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {isDragActive ? 'Drop your receipt here' : 'Upload your receipt'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop your receipt here, or click to browse
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Image className="h-4 w-4" />
                    <span>Images</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>PDF Files</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
    </Card>
  );
}