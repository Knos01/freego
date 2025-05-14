'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { LanguageToggle } from './components/LanguageToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { ImageUploader } from './components/ImageUploader';
import { IngredientsList } from './components/IngredientsList';
import { RecipeDisplay } from './components/RecipeDisplay';

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[] | null>(null);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [language, setLanguage] = useState<'en' | 'it'>('en');

  const t = {
    en: {
      title: 'Smart Recipe Assistant',
      description: 'Take a photo of your ingredients and get recipe suggestions',
      analyze: 'Analyze Ingredients',
      suggesting: 'Generating Recipe...',
      suggest: 'Suggest Recipe',
      detected: 'Detected Ingredients:',
      generated: 'Suggested Recipe:',
      generatingImage: 'Generating Dish Image...',
      generateImage: 'Generate Dish Image',
      appTitle: 'FreeGo'
    },
    it: {
      title: 'Assistente Ricette Intelligente',
      description: 'Scatta una foto degli ingredienti e ricevi suggerimenti di ricette',
      analyze: 'Analizza Ingredienti',
      suggesting: 'Generazione Ricetta...',
      suggest: 'Suggerisci Ricetta',
      detected: 'Ingredienti Rilevati:',
      generated: 'Ricetta Suggerita:',
      generatingImage: 'Generazione Immagine Piatto...',
      generateImage: 'Genera Immagine Piatto',
      appTitle: 'FreeGo'
    },
  }[language];

  const handleAnalyze = async () => {
    if (!previewUrl || !previewUrl.startsWith('http')) {
      alert('Please upload an image before analyzing.');
      return;
    }

    setLoading(true);
    setIngredients(null);
    setRecipe(null);
    setRecipeImage(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: previewUrl }),
      });

      const data = await res.json();
      const cleaned = data.result.trim().replace(/^```json|```$/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setIngredients(parsed);
    } catch (err) {
      console.error(err);
      setIngredients(['Error analyzing image.']);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestRecipe = async () => {
    if (!ingredients || ingredients.length === 0) return;
    setSuggesting(true);
    setRecipe(null);
    setRecipeImage(null);

    try {
      const res = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, language }),
      });

      const data = await res.json();
      setRecipe(data.recipe);

      // Automatically generate image
      const imageRes = await fetch('/api/recipe-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: data.recipe, language }),
      });

      const imageData = await imageRes.json();
      setRecipeImage(imageData.imageUrl);
    } catch (err) {
      console.error(err);
      setRecipe('Failed to generate recipe.');
      setRecipeImage(null);
    } finally {
      setSuggesting(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-start bg-background">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 gap-2">
          <h1 className="text-3xl font-bold text-foreground">{t.appTitle}</h1>
          <div className="flex gap-2 items-center">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <ThemeToggle />
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <ImageUploader
              previewUrl={previewUrl}
              onUploadComplete={(imageUrl) => {
                setPreviewUrl(imageUrl);
                setIngredients(null);
                setRecipe(null);
                setRecipeImage(null);
              }}
            />

            {previewUrl && (
              <Button onClick={handleAnalyze} disabled={loading} className="w-full">
                {loading ? `${t.analyze}...` : t.analyze}
              </Button>
            )}

            {ingredients && (
              <IngredientsList
                ingredients={ingredients}
                onSuggestRecipe={handleSuggestRecipe}
                suggesting={suggesting}
                translations={{
                  detected: t.detected,
                  suggesting: t.suggesting,
                  suggest: t.suggest,
                }}
              />
            )}

            {recipe && (
              <RecipeDisplay
                recipe={recipe}
                recipeImage={recipeImage}
                translations={{
                  generated: t.generated,
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
