#!/bin/bash

# AWS Setup Script for Celeste Air
# This script helps set up the AWS infrastructure for production deployment

set -e

echo "🚀 Setting up AWS infrastructure for Celeste Air..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if user is logged in
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Get AWS account ID and region
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=$(aws configure get region)

if [ -z "$AWS_REGION" ]; then
    AWS_REGION="eu-central-1"
    echo "⚠️  No default region set. Using eu-central-1"
fi

echo "✅ AWS Account ID: $AWS_ACCOUNT_ID"
echo "✅ AWS Region: $AWS_REGION"

# Create ECR repositories
echo "📦 Creating ECR repositories..."

aws ecr create-repository --repository-name celeste-air-backend --region $AWS_REGION || echo "Repository already exists"
aws ecr create-repository --repository-name celeste-air-frontend --region $AWS_REGION || echo "Repository already exists"

BACKEND_REPO_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/celeste-air-backend"
FRONTEND_REPO_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/celeste-air-frontend"

echo "✅ Backend ECR: $BACKEND_REPO_URI"
echo "✅ Frontend ECR: $FRONTEND_REPO_URI"

# Create S3 bucket for static files (optional)
BUCKET_NAME="celeste-air-production-$AWS_ACCOUNT_ID"

echo "🪣 Creating S3 bucket for static files..."
aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION || echo "Bucket already exists"

# Create VPC and subnets (simplified - in production use CloudFormation)
echo "🌐 Note: You'll need to create VPC, subnets, and security groups manually or use CloudFormation templates"
echo "   Available templates:"
echo "   - aws/ecs-cluster.yml (ECS cluster, ALB, services)"
echo "   - aws/rds-postgres.yml (PostgreSQL database)"

# Generate .env.production with actual values
echo "📝 Generating .env.production file..."

cat > .env.production << EOF
# Production Environment Variables for Celeste Air

# Django Settings
DEBUG=False
SECRET_KEY=$(openssl rand -hex 32)
DJANGO_SETTINGS_MODULE=flight_backend.settings
ALLOWED_HOSTS=api.your-domain.com,your-domain.com

# Database (AWS RDS PostgreSQL)
# Update these values after creating RDS instance
DATABASE_URL=postgresql://celesteuser:your-db-password@your-rds-endpoint:5432/celesteair

# AWS Settings
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_DEFAULT_REGION=$AWS_REGION
AWS_STORAGE_BUCKET_NAME=$BUCKET_NAME

# ECR Repository URIs
ECR_BACKEND_REPO=$BACKEND_REPO_URI
ECR_FRONTEND_REPO=$FRONTEND_REPO_URI
EOF

echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Create VPC, subnets, and security groups"
echo "2. Deploy CloudFormation stacks:"
echo "   aws cloudformation deploy --template-file aws/rds-postgres.yml --stack-name celeste-air-rds"
echo "   aws cloudformation deploy --template-file aws/ecs-cluster.yml --stack-name celeste-air-ecs"
echo "3. Update .env.production with actual database credentials"
echo "4. Set up domain and SSL certificate"
echo "5. Configure GitHub secrets for CI/CD"
echo "6. Push code to trigger deployment"
echo ""
echo "🔗 Useful links:"
echo "- AWS Console: https://console.aws.amazon.com/"
echo "- CloudFormation: https://console.aws.amazon.com/cloudformation/"
echo "- ECR: https://console.aws.amazon.com/ecr/"
echo "- ECS: https://console.aws.amazon.com/ecs/"