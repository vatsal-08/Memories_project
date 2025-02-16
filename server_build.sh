#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Change directory to the server folder
echo "Navigating to the server directory..."
cd server || { echo "Server directory not found!"; exit 1; }

# Install Node.js dependencies
echo "Installing dependencies..."
npm install

# Run the Node.js server
echo "Starting the server..."
node index.js