#!/bin/bash

# AWS ECS Deployment Script
# Ova skripta se može pozvati iz GitHub Actions deploy job-a

set -e

# Environment variables (set in GitHub Secrets)
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
# ECS_CLUSTER_NAME
# ECS_SERVICE_NAME
# ECR_REPOSITORY_BACKEND
# ECR_REPOSITORY_FRONTEND

echo "🚀 Starting AWS ECS deployment..."

# Login to ECR
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCESS_KEY_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com

# Tag and push images
BACKEND_TAG="$AWS_ACCESS_KEY_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$ECR_REPOSITORY_BACKEND:latest"
FRONTEND_TAG="$AWS_ACCESS_KEY_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:latest"

docker tag ${{ env.REGISTRY }}/${{ env.BACKEND_IMAGE }}:latest $BACKEND_TAG
docker tag ${{ env.REGISTRY }}/${{ env.FRONTEND_IMAGE }}:latest $FRONTEND_TAG

docker push $BACKEND_TAG
docker push $FRONTEND_TAG

# Update ECS service
aws ecs update-service \
    --cluster $ECS_CLUSTER_NAME \
    --service $ECS_SERVICE_NAME \
    --force-new-deployment \
    --region $AWS_DEFAULT_REGION

echo "✅ Deployment completed successfully!"

# Optional: Wait for deployment to complete
echo "⏳ Waiting for deployment to finish..."
aws ecs wait services-stable \
    --cluster $ECS_CLUSTER_NAME \
    --services $ECS_SERVICE_NAME \
    --region $AWS_DEFAULT_REGION

echo "🎉 Service is stable and deployment finished!"