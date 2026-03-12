#!/bin/bash

# Local Production Test Script
# Test production build locally before deploying to AWS

set -e

echo "🧪 Testing production build locally..."

# Build production images
echo "🏗️  Building production images..."
docker-compose -f docker-compose.prod.yml build

# Start production services
echo "🚀 Starting production services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Test health endpoints
echo "🔍 Testing health endpoints..."

# Test frontend
if curl -f -s http://localhost > /dev/null; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
fi

# Test backend API
if curl -f -s http://localhost/api/letovi/ > /dev/null; then
    echo "✅ Backend API is healthy"
else
    echo "❌ Backend API health check failed"
fi

echo "🎉 Local production test completed!"
echo ""
echo "🌐 Frontend: http://localhost"
echo "🔌 Backend API: http://localhost/api/"
echo ""
echo "To stop: docker-compose -f docker-compose.prod.yml down"