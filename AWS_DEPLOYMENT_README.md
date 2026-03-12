# AWS Production Deployment Guide

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured (`aws configure`)
3. **Domain name** (optional but recommended)
4. **SSL Certificate** from AWS Certificate Manager

## Quick Setup

### 1. Run Setup Script
```bash
chmod +x setup-aws.sh
./setup-aws.sh
```

This will:
- Create ECR repositories for Docker images
- Create S3 bucket for static files
- Generate `.env.production` template

### 2. Create Infrastructure

#### Option A: CloudFormation (Recommended)
```bash
# Deploy RDS PostgreSQL
aws cloudformation deploy \
  --template-file aws/rds-postgres.yml \
  --stack-name celeste-air-rds \
  --parameter-overrides \
    VpcId=vpc-12345678 \
    SubnetIds=subnet-12345678,subnet-87654321 \
    DBPassword=your-secure-password

# Deploy ECS Cluster
aws cloudformation deploy \
  --template-file aws/ecs-cluster.yml \
  --stack-name celeste-air-ecs \
  --parameter-overrides \
    VpcId=vpc-12345678 \
    SubnetIds=subnet-12345678,subnet-87654321 \
    CertificateArn=arn:aws:acm:region:account:certificate/certificate-id
```

#### Option B: Manual Setup via AWS Console
1. Create VPC with public/private subnets
2. Create RDS PostgreSQL instance
3. Create ECS cluster with Fargate
4. Create Application Load Balancer
5. Create target groups for frontend (port 80) and backend (port 8000)

### 3. Configure GitHub Secrets

Add these secrets to your GitHub repository:

```bash
# AWS Credentials
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=eu-central-1

# ECS Configuration
ECS_CLUSTER_NAME=celeste-air-cluster
ECS_BACKEND_SERVICE_NAME=celeste-air-backend-service
ECS_FRONTEND_SERVICE_NAME=celeste-air-frontend-service

# Database
DATABASE_URL=postgresql://user:password@rds-endpoint:5432/dbname

# Django
DJANGO_SECRET_KEY=your-secret-key
ALLOWED_HOSTS=your-domain.com,api.your-domain.com
```

### 4. Update Environment Variables

Edit `.env.production` with actual values:
- Database endpoint from RDS
- Domain names
- AWS credentials

### 5. Deploy

Push to `main` branch to trigger automatic deployment:

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

## Architecture

```
Internet
    ↓
Application Load Balancer (HTTPS)
    ↓
├── Frontend Service (ECS Fargate)
│   └── Nginx + React App (Port 80)
│
└── Backend Service (ECS Fargate)
    └── Django + Gunicorn (Port 8000)
        ↓
    PostgreSQL RDS
```

## Monitoring

### CloudWatch Logs
- `/ecs/celeste-air-frontend`
- `/ecs/celeste-air-backend`

### Health Checks
- Frontend: `GET /`
- Backend: `GET /api/health/`

## Scaling

### Horizontal Scaling
```bash
# Scale backend service
aws ecs update-service \
  --cluster celeste-air-cluster \
  --service celeste-air-backend-service \
  --desired-count 3

# Scale frontend service
aws ecs update-service \
  --cluster celeste-air-cluster \
  --service celeste-air-frontend-service \
  --desired-count 2
```

### Auto Scaling (Optional)
Create CloudWatch alarms and scaling policies for CPU/memory usage.

## Backup & Recovery

### Database Backups
RDS automatically creates daily backups (7-day retention).

### Manual Backup
```bash
aws rds create-db-snapshot \
  --db-instance-identifier your-db-instance \
  --db-snapshot-identifier manual-backup-$(date +%Y%m%d)
```

## Troubleshooting

### Check Service Status
```bash
# List services
aws ecs list-services --cluster celeste-air-cluster

# Describe service
aws ecs describe-services \
  --cluster celeste-air-cluster \
  --services celeste-air-backend-service
```

### View Logs
```bash
# Backend logs
aws logs tail /ecs/celeste-air-backend --follow

# Frontend logs
aws logs tail /ecs/celeste-air-frontend --follow
```

### Common Issues

1. **Service won't start**: Check CloudWatch logs for errors
2. **Database connection fails**: Verify security groups and VPC settings
3. **Load balancer health checks fail**: Check target group health
4. **SSL certificate issues**: Ensure certificate is in the correct region

## Cost Optimization

- Use Fargate Spot for non-critical workloads
- Set up auto-scaling to reduce costs during low traffic
- Use CloudFront CDN for static assets
- Monitor costs with AWS Cost Explorer

## Security

- All traffic goes through HTTPS
- Database is in private subnets
- ECS tasks run with minimal IAM permissions
- Regular security updates via ECR image scanning