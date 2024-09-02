#!/bin/bash
# Script to start multiple services

# Set the environment 
export NODE_ENV=development

# Start auth service
cd backend/auth
npm run dev &
AUTH_PID=$!

# Start communication service
cd ../communication
npm run dev &
COMMUNICATION_PID=$!

# Start gateway service
cd ../gateway-dev
npm run dev &
GATEWAY_PID=$!

# Start management service
cd ../management
npm run dev &
MANAGEMENT_PID=$!

# Start notification service
cd ../notification
npm run dev &
NOTIFICATION_PID=$!

# Start community service
cd ../community
npm run dev &
COMMUNITY_PID=$!

# Wait for all services to exit
wait $AUTH_PID $COMMUNICATION_PID $GATEWAY_PID $MANAGEMENT_PID $NOTIFICATION_PID $COMMUNITY_PID
