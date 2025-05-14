'use client';

import { Button } from '@/components/ui/button';

interface IngredientsListProps {
  ingredients: string[];
  onSuggestRecipe: () => void;
  suggesting: boolean;
  translations: {
    detected: string;
    suggesting: string;
    suggest: string;
  };
}

export function IngredientsList({
  ingredients,
  onSuggestRecipe,
  suggesting,
  translations
}: IngredientsListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{translations.detected}</h3>
      <ul className="list-disc pl-6 space-y-1">
        {ingredients.map((ingredient, idx) => (
          <li key={idx} className="text-muted-foreground">
            {ingredient}
          </li>
        ))}
      </ul>
      <Button
        onClick={onSuggestRecipe}
        disabled={suggesting}
        variant="secondary"
        className="w-full"
      >
        {suggesting ? translations.suggesting : translations.suggest}
      </Button>
    </div>
  );
} 