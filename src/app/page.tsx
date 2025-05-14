/* File: app/page.tsx */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-4 p-6">
          <h1 className="text-xl font-bold text-center">📸 Scatta una foto degli ingredienti</h1>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            className="text-sm"
          />

          {previewUrl && (
            <div className="relative w-full h-64 mt-4">
              <Image
                src={previewUrl}
                alt="Anteprima"
                layout="fill"
                objectFit="cover"
                className="rounded-xl border"
              />
            </div>
          )}

          <Button disabled={!selectedImage} className="mt-4 w-full">
            Analizza Ingredienti
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
