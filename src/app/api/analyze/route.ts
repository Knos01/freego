import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { imageUrl } = body

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 })
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // ✅ UPDATED MODEL
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Analyze this image and return a clean JSON array of only the visible food ingredients.',
          },
          {
            type: 'image_url',
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
    max_tokens: 300,
  })

  const result = response.choices[0]?.message?.content || ''
  return NextResponse.json({ result })
}
