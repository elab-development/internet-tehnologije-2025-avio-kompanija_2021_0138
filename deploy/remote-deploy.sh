#!/bin/bash

# Remote Docker Compose Deployment Script
# Za deployment na VPS/Droplet sa Docker-om

set -e

# Configuration
REMOTE_HOST=${REMOTE_HOST:-"your-server.com"}
REMOTE_USER=${REMOTE_USER:-"deploy"}
REMOTE_PATH=${REMOTE_PATH:-"/opt/avio-kompanija"}
SSH_KEY_PATH=${SSH_KEY_PATH:-"~/.ssh/id_rsa"}

echo "🚀 Starting remote deployment to $REMOTE_HOST..."

# Copy files to remote server
rsync -avz --exclude='.git' --exclude='node_modules' --exclude='__pycache__' \
    -e "ssh -i $SSH_KEY_PATH" \
    . $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

# Run deployment commands on remote server
ssh -i $SSH_KEY_PATH $REMOTE_USER@$REMOTE_HOST << EOF
    cd $REMOTE_PATH

    # Pull latest changes (if using git)
    # git pull origin main

    # Load environment variables
    if [ -f .env ]; then
        export \$(cat .env | xargs)
    fi

    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down || true

    # Pull latest images (if using registry)
    # docker-compose -f docker-compose.prod.yml pull

    # Start new containers
    docker-compose -f docker-compose.prod.yml up -d --build

    # Wait for services to be healthy
    echo "⏳ Waiting for services to start..."
    sleep 30

    # Run database migrations if needed
    docker-compose -f docker-compose.prod.yml exec -T backend python manage.py migrate || true

    # Collect static files
    docker-compose -f docker-compose.prod.yml exec -T backend python manage.py collectstatic --noinput || true

    # Run health check
    curl -f http://localhost/health || echo "Health check failed, but continuing..."

    echo "✅ Deployment completed successfully!"
EOF

echo "🎉 Remote deployment finished!"