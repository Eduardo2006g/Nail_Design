#!/bin/bash
cd /home/dudu/Nail_Design/backend
rm -rf node_modules package-lock.json
docker run --network host --rm -v $(pwd):/app -w /app node:20 bash -c "npm install && npx prisma generate && npx prisma db push && npm install @prisma/client && chown -R 1000:1000 ."
