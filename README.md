# Project Code: mag

Digital Library Analytics Dashboard. That helps librarians track book lending patterns and reader engagement. The system should provide insights through visualizations and allow basic management of book records.

Consists of backend and frontend with below spesification:
- Frontend: 
  - Vite-react
  - Radix-UI (UI component)
  - Tailwind
- Backend: 
  - Fastify (typescript)  
  - Prisma (DB ORM)
  - Postgresql


## How to run locally
Git clone this project:
- Backend:
  1. Go to folder api
  2. copy paste .env.example into .env
  3. run: npx prisma generate
  4. run: npm install
  5. run: npm run dev

- Frontend:
  1. Go to folder chart
  2. run: npm install
  3. run: npm run dev
