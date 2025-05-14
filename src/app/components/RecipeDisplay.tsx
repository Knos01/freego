'use client';

import Image from 'next/image';

interface RecipeDisplayProps {
  recipe: string;
  recipeImage: string | null;
  translations: {
    generated: string;
  };
}

export function RecipeDisplay({ recipe, recipeImage, translations }: RecipeDisplayProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{translations.generated}</h3>
      <div className="bg-card rounded-lg p-4 text-card-foreground">
        <pre className="whitespace-pre-wrap font-mono text-sm">{recipe}</pre>
      </div>
      
      {recipeImage && (
        <div className="relative w-full aspect-video">
          <Image
            src={recipeImage}
            alt="Generated Dish"
            fill
            className="rounded-lg border object-cover"
          />
        </div>
      )}
    </div>
  );
} 