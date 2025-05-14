'use client';

import { UploadButton } from '@uploadthing/react';
import Image from 'next/image';
import type { OurFileRouter } from '../api/uploadthing/core';

interface ImageUploaderProps {
  previewUrl: string | null;
  onUploadComplete: (imageUrl: string) => void;
}

export function ImageUploader({ previewUrl, onUploadComplete }: ImageUploaderProps) {
  return (
    <>
      <UploadButton<OurFileRouter, 'imageUploader'>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const imageUrl = res?.[0]?.serverData?.uploadedUrl;
          if (imageUrl) {
            onUploadComplete(imageUrl);
          } else {
            alert('Upload completed, but no image URL returned.');
          }
        }}
        onUploadError={(error) => {
          alert(`Upload failed: ${error.message}`);
        }}
        appearance={{
          button: 'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md',
          container: 'w-full',
        }}
      />

      {previewUrl && (
        <div className="relative w-full aspect-video">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="rounded-lg border object-cover"
          />
        </div>
      )}
    </>
  );
} 