import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { description } = await req.json()

  if (!description) {
    return NextResponse.json({ error: 'Missing description' }, { status: 400 })
  }

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `A realistic photo of this dish: ${description}`,
    n: 1,
    size: '1024x1024',
    quality: 'hd',
    response_format: 'url',
  })

  const imageUrl = response.data[0].url
  return NextResponse.json({ imageUrl })
}
