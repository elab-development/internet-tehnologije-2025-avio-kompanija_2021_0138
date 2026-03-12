#!/bin/bash

# Simple VPS Deployment Script
# Deploy to any VPS with Docker support (DigitalOcean, Linode, Vultr, etc.)

set -e

echo "🚀 Deploying Celeste Air to VPS..."

# Configuration - Update these values
VPS_HOST=${VPS_HOST:-"your-vps-ip"}
VPS_USER=${VPS_USER:-"root"}
SSH_KEY=${SSH_KEY:-"~/.ssh/id_rsa"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Pre-deployment checklist:${NC}"
echo "1. ✅ VPS server is running (Ubuntu/Debian/CentOS)"
echo "2. ✅ Docker and Docker Compose are installed on VPS"
echo "3. ✅ SSH key is set up for passwordless login"
echo "4. ✅ Domain points to VPS IP (optional)"
echo "5. ✅ Firewall allows ports 80, 443, 22"

# Test connection
echo -e "${YELLOW}🔍 Testing SSH connection...${NC}"
if ! ssh -i $SSH_KEY -o ConnectTimeout=10 -o StrictHostKeyChecking=no $VPS_USER@$VPS_HOST "echo 'SSH OK'" 2>/dev/null; then
    echo -e "${RED}❌ SSH connection failed!${NC}"
    echo "Please check:"
    echo "  - VPS IP address is correct"
    echo "  - SSH key is properly configured"
    echo "  - Firewall allows SSH (port 22)"
    exit 1
fi
echo -e "${GREEN}✅ SSH connection successful${NC}"

# Copy files to VPS
echo -e "${YELLOW}📦 Copying files to VPS...${NC}"
rsync -avz --exclude='.git' --exclude='node_modules' --exclude='__pycache__' \
    --exclude='.env*' --exclude='*.log' \
    -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
    . $VPS_USER@$VPS_HOST:~/celeste-air/

echo -e "${GREEN}✅ Files copied successfully${NC}"

# Run deployment on VPS
echo -e "${YELLOW}🏗️  Running deployment on VPS...${NC}"
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $VPS_USER@$VPS_HOST << 'EOF'
    set -e

    cd ~/celeste-air

    echo "🐳 Building and starting services..."
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml build --no-cache
    docker-compose -f docker-compose.prod.yml up -d

    echo "⏳ Waiting for services to start..."
    sleep 30

    echo "🔍 Checking service health..."
    if curl -f -s --max-time 10 http://localhost > /dev/null 2>&1; then
        echo "✅ Frontend is running!"
    else
        echo "⚠️  Frontend health check failed, but continuing..."
    fi

    if curl -f -s --max-time 10 http://localhost/api/letovi/ > /dev/null 2>&1; then
        echo "✅ Backend API is running!"
    else
        echo "⚠️  Backend API health check failed, but continuing..."
    fi

    echo "🎉 Deployment completed!"
    echo ""
    echo "🌐 Your app should be available at:"
    echo "   http://YOUR_VPS_IP"
    echo ""
    echo "📊 To check logs:"
    echo "   docker-compose -f docker-compose.prod.yml logs -f"
    echo ""
    echo "🛑 To stop services:"
    echo "   docker-compose -f docker-compose.prod.yml down"
EOF

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}🌐 Your Celeste Air app is now live at:${NC}"
echo -e "${GREEN}   http://$VPS_HOST${NC}"
echo ""
echo -e "${YELLOW}📋 Useful commands:${NC}"
echo "  • Check logs: ssh $VPS_USER@$VPS_HOST 'cd ~/celeste-air && docker-compose -f docker-compose.prod.yml logs -f'"
echo "  • Restart: ssh $VPS_USER@$VPS_HOST 'cd ~/celeste-air && docker-compose -f docker-compose.prod.yml restart'"
echo "  • Update: ./deploy-to-vps.sh (from your local machine)"
echo ""
echo -e "${YELLOW}🔒 Security reminders:${NC}"
echo "  • Change default SSH port (22) to something else"
echo "  • Set up firewall (ufw) to only allow necessary ports"
echo "  • Keep your server updated: apt update && apt upgrade"
echo "  • Consider setting up SSL certificate with Let's Encrypt"