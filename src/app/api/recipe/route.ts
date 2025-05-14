import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    const { ingredients, language } = await req.json()

  if (!ingredients || !Array.isArray(ingredients)) {
    return NextResponse.json({ error: 'Missing or invalid ingredients' }, { status: 400 })
  }
  

  const prompt = `Based on the following ingredients: ${ingredients.join(', ')}, suggest a simple, healthy recipe in ${language === 'it' ? 'Italian' : 'English'}. Include a title and clear step-by-step instructions.`
  

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
  })

  const result = completion.choices[0].message?.content

  return NextResponse.json({ recipe: result })
}
