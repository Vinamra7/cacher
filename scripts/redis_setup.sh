#!/bin/bash
# Update package index
sudo apt-get update

# Install Redis server
sudo apt-get install -y redis-server

# Allow Redis to listen on all interfaces
redisConfContent='
bind 0.0.0.0
requirepass abcd
port 8000
'

# Use echo to output the content to the redis.conf file
echo "$redisConfContent" | sudo tee /home/test-project/redis.conf

# Restart Redis for changes to take effect
sudo systemctl restart redis-server

redis-server /home/test-project/redis.conf


