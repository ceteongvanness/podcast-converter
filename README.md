# Podcast Converter

A Next.js application that converts text content into podcast-style audio using AWS Polly text-to-speech service.

## Project Structure
```
podcast-converter/
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       ├── ci.yml         # Continuous Integration
│       └── cd.yml        # Continuous Deployment
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   └── lib/             # Utility functions
├── k8s/                 # Kubernetes manifests
│   └── base/
│       ├── deployments/
│       ├── services/
│       ├── config/
│       ├── ingress/
│       └── monitoring/
└── public/              # Static files
```

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Docker (for containerization)
- AWS Account (for Polly service)
- Kubernetes cluster (for deployment)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ceteongvanness/podcast-converter.git
cd podcast-converter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your settings
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Features

- Text to speech conversion
- Podcast-style audio processing
- Multiple voice options
- Real-time conversion status
- Audio preview and download

## Development

### Available Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Testing
npm test

# Linting
npm run lint
```

### Docker Build

```bash
docker build -t podcast-converter .
docker run -p 3000:3000 podcast-converter
```

### Kubernetes Deployment

1. Update configurations in `k8s/base/config/`
2. Deploy:
```bash
kubectl apply -f k8s/base/config/
kubectl apply -f k8s/base/deployments/
kubectl apply -f k8s/base/services/
kubectl apply -f k8s/base/ingress/
```

## CI/CD

GitHub Actions workflows:

- `ci.yml`: Runs on pull requests and pushes to main/develop
  - Linting
  - Testing
  - Building

- `cd.yml`: Runs on pushes to main
  - Docker image building
  - Container registry pushing
  - Kubernetes deployment

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
