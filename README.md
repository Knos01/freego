# 🍳 FreeGo - Smart Recipe Assistant

FreeGo is an AI-powered recipe assistant that helps you create delicious meals from the ingredients you have. Simply take a photo of your ingredients, and FreeGo will analyze them and suggest personalized recipes.

## ✨ Features

- 📸 **Ingredient Recognition**: Upload photos of your ingredients for instant recognition
- 🧪 **Smart Recipe Generation**: Get personalized recipe suggestions based on your available ingredients
- 🖼️ **Recipe Visualization**: See AI-generated images of the suggested dishes
- 🌍 **Multi-language Support**: Available in English and Italian
- 🌓 **Dark/Light Mode**: Comfortable viewing experience in any lighting condition

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/freego.git
cd freego
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your API keys for:
- OpenAI API
- UploadThing

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [OpenAI API](https://openai.com/) - AI Recipe Generation
- [UploadThing](https://uploadthing.com/) - Image Upload
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme Management

## 📱 Project Structure

```
freego/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── components/    # Page-specific components
│   │   └── page.tsx      # Main page
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   └── lib/              # Utility functions
├── public/               # Static assets
└── package.json         # Project dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for the AI capabilities
- [Vercel](https://vercel.com/) for hosting and deployment
- [shadcn](https://twitter.com/shadcn) for the amazing UI components
