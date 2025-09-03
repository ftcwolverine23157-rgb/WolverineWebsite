# Team Wolverine Showcase

A modern React-based showcase website for Team Wolverine robotics team, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd team-wolverine-showcase-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build directory

### Docker Development

1. **Build Docker image**
   ```bash
   npm run docker:build
   ```

2. **Run in development mode**
   ```bash
   npm run docker:dev
   ```

3. **Run in production mode**
   ```bash
   npm run docker:prod
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout component
│   └── Navigation.tsx  # Navigation component
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## 🎨 Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State Management**: TanStack Query

## 🚀 Deployment

### GitHub Pages

The project is configured with GitHub Actions for automatic deployment:

1. Push to `main` branch
2. GitHub Actions will build and deploy to GitHub Pages
3. Update the domain in `.github/workflows/deploy.yml` if needed

### Docker Deployment

1. **Build production image**
   ```bash
   docker build -t team-wolverine .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 team-wolverine
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

- `VITE_APP_TITLE` - Application title
- `VITE_APP_DESCRIPTION` - Application description
- `VITE_API_BASE_URL` - API base URL (if applicable)
- Social media URLs and contact information

### VS Code Setup

The project includes VS Code configuration for optimal development experience:

- Recommended extensions in `.vscode/extensions.json`
- Settings in `.vscode/settings.json`
- Debug configurations in `.vscode/launch.json`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   npm run type-check
   ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email contact@teamwolverine.com or create an issue in the repository.