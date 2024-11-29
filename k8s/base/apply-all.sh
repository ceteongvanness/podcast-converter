#!/bin/bash

# Create namespaces
kubectl create namespace podcast-converter
kubectl create namespace monitoring

# Apply configurations
kubectl apply -f k8s/base/config/
kubectl apply -f k8s/base/deployments/
kubectl apply -f k8s/base/services/
kubectl apply -f k8s/base/ingress/
kubectl apply -f k8s/base/monitoring/

# Check status
echo "Checking deployment status..."
kubectl get pods -n podcast-converter
kubectl get pods -n monitoring