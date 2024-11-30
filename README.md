# Podcast Converter

A Next.js application that converts text content into podcast-style audio using AI technology.

## Overview

This project converts text into podcast-style discussions using Google's Gemini AI and AWS Polly, deployed on Kubernetes with infrastructure managed by Terraform.

## Architecture

```mermaid
flowchart TB
    subgraph "User Interaction"
        User["👤 User"]
        Browser["🌐 Web Browser"]
    end

    subgraph "Frontend - Next.js"
        UI["UI Components"]
        ClientLogic["Client Logic"]
    end

    subgraph "API Layer"
        APIRoute["Next.js API Routes"]
        GeminiAI["Google Gemini AI"]
        AWSPolly["AWS Polly"]
    end

    subgraph "Infrastructure - Terraform"
        TF["Terraform"]
        subgraph "AWS Infrastructure"
            direction TB
            VPC["VPC"]
            EKS["EKS Cluster"]
            S3["S3 Bucket"]
            IAM["IAM Roles"]
            
            subgraph "Monitoring"
                Prometheus["Prometheus"]
                Grafana["Grafana"]
            end
        end
    end

    subgraph "CI/CD - GitHub Actions"
        CI["CI Pipeline"]
        CD["CD Pipeline"]
    end

    subgraph "Kubernetes Resources"
        Deploy["Deployments"]
        Service["Services"]
        Ingress["Ingress"]
        ConfigMap["ConfigMaps"]
    end

    %% User Flow
    User --> Browser
    Browser --> UI
    UI --> ClientLogic
    ClientLogic --> APIRoute

    %% API Flow
    APIRoute --> GeminiAI
    APIRoute --> AWSPolly
    AWSPolly --> S3

    %% Infrastructure Management
    TF --> VPC
    TF --> EKS
    TF --> S3
    TF --> IAM
    TF --> Prometheus
    TF --> Grafana

    %% Deployment Flow
    CI --> CD
    CD --> Deploy
    Deploy --> Service
    Service --> Ingress

    %% Infrastructure Connections
    EKS --> Deploy
    IAM --> AWSPolly
    ConfigMap --> Deploy

    classDef infra fill:#f9f,stroke:#333,stroke-width:2px
    classDef aws fill:#FF9900,stroke:#333,stroke-width:2px,color:white
    classDef monitoring fill:#00A000,stroke:#333,stroke-width:2px,color:white
    classDef k8s fill:#326CE5,stroke:#333,stroke-width:2px,color:white
    
    class TF infra
    class VPC,EKS,S3,IAM aws
    class Prometheus,Grafana monitoring
    class Deploy,Service,Ingress,ConfigMap k8s

## Features

- Text to podcast-style audio conversion
- AI-generated natural discussions using Gemini 1.5 Pro
- Natural voice synthesis with AWS Polly
- Multiple voice support for dynamic conversations
- Real-time conversion status
- TypeScript support
- Kubernetes deployment ready
- CI/CD pipeline with GitHub Actions

## Project Structure
```
podcast-converter/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/            # React components
│   │   └── ui/               # UI components
│   └── lib/                  # Utility functions
├── k8s/                      # Kubernetes configurations
│   └── base/
│       ├── deployments/
│       ├── services/
│       ├── config/
│       ├── ingress/
│       └── monitoring/
├── .github/                  # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
└── public/                   # Static files
```

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- AWS Account with Polly access
- Google Cloud Account with Gemini API access
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

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required environment variables:
```
GEMINI_API_KEY=your_gemini_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
```

## Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build      # Build for production
npm start          # Start production server

# Linting
npm run lint       # Run linter
```

## CI/CD Pipeline

GitHub Actions workflow includes:

1. CI Pipeline:
   - Linting
   - Build verification

2. CD Pipeline:
   - Development deployment
   - Staging deployment
   - Automatic rollback on failure

## Docker

Build the Docker image:
```bash
docker build -t podcast-converter .
docker run -p 3000:3000 podcast-converter
```

## Kubernetes Deployment

1. Apply configurations:
```bash
kubectl apply -f k8s/base/config/
kubectl apply -f k8s/base/deployments/
kubectl apply -f k8s/base/services/
kubectl apply -f k8s/base/ingress/
```

2. Verify deployment:
```bash
kubectl get pods -n podcast-converter
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
