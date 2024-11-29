# Podcast Converter Application

Convert text content into podcast-style audio using AWS Polly text-to-speech service.

## Project Structure
```
podcast-converter/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── convert/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Button.tsx
│   │   └── TextArea.tsx
│   └── lib/
│       └── utils.ts
├── k8s/
│   └── base/
│       ├── deployments/
│       │   ├── frontend-deployment.yaml
│       │   └── backend-deployment.yaml
│       ├── services/
│       │   └── services.yaml
│       ├── config/
│       │   ├── configmap.yaml
│       │   └── secrets.yaml
│       ├── ingress/
│       │   └── ingress.yaml
│       └── monitoring/
│           ├── prometheus-config.yaml
│           ├── prometheus-deployment.yaml
│           ├── grafana-deployment.yaml
│           └── monitoring-services.yaml
├── public/
├── .env.local
├── package.json
└── README.md
```

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- AWS Account with Polly access
- Kubernetes cluster (for deployment)
- Docker (for containerization)

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

3. Create `.env.local` file:
```
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=your_region_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Text to speech conversion
- Multiple voice options
- Podcast-style audio processing
- Kubernetes deployment support
- Prometheus/Grafana monitoring

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Running Linter
```bash
npm run lint
```

## Deployment

### Docker Build
```bash
docker build -t podcast-converter:latest .
```

### Kubernetes Deployment
1. Create namespaces:
```bash
kubectl create namespace podcast-converter
kubectl create namespace monitoring
```

2. Apply Kubernetes configurations:
```bash
kubectl apply -f k8s/base/config/
kubectl apply -f k8s/base/deployments/
kubectl apply -f k8s/base/services/
kubectl apply -f k8s/base/ingress/
kubectl apply -f k8s/base/monitoring/
```

## Monitoring

- Prometheus metrics available at `/metrics`
- Grafana dashboards for visualization
- Alert manager for notifications

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| AWS_ACCESS_KEY_ID | AWS Access Key | Yes |
| AWS_SECRET_ACCESS_KEY | AWS Secret Key | Yes |
| AWS_REGION | AWS Region | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Next.js team for the amazing framework
- AWS for Polly service
- Kubernetes community
