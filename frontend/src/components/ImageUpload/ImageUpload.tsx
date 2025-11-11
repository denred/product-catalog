'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';

import { useAuth } from '@/contexts/AuthContext';

import './styles.scss';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  placeholder = 'https://example.com/image.jpg',
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !token) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}upload/image`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      onChange(result.url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <div className="upload-mode-selector">
        <button
          type="button"
          className={`mode-btn ${uploadMode === 'url' ? 'active' : ''}`}
          onClick={() => setUploadMode('url')}
        >
          URL
        </button>
        <button
          type="button"
          className={`mode-btn ${uploadMode === 'file' ? 'active' : ''}`}
          onClick={() => setUploadMode('file')}
        >
          Upload File
        </button>
      </div>

      {uploadMode === 'url' ? (
        <input
          type="url"
          className="form-input"
          placeholder={placeholder}
          value={value}
          onChange={handleUrlChange}
        />
      ) : (
        <div className="file-upload-area">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="file-input-hidden"
          />
          <button
            type="button"
            className="upload-btn"
            onClick={triggerFileInput}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Choose Image File'}
          </button>
          {value && (
            <div className="current-image-url">
              <span>Current: {value}</span>
            </div>
          )}
        </div>
      )}

      {value && (
        <div className="image-preview">
          <Image
            src={value}
            alt="Preview"
            width={200}
            height={200}
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
