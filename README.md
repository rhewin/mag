# Project Code: mag

Digital Library Analytics Dashboard. That helps librarians track book lending patterns and reader engagement. The system should provide insights through visualizations and allow basic management of book records.

Consists of backend and frontend with below spesification:
- Backend: 
  - Fastify (typescript)  
  - Prisma (DB ORM)
  - Postgresql

- Frontend: 
  - Vite-react
  - Radix-UI (UI component)
  - Tailwind
  - ChartJS


## How to run locally
Git clone this project:
- Backend:
  - Go to folder api
  - copy paste .env.example into .env
  - run: `npx prisma generate`
  - run: `npm install`
  - run: `npm run dev`

  *note 1: to run sample data simply run `npm run seed:sample`*<br>
  *note 2: to reset sample data simply run `npx prisma migrate reset`*

- Frontend:
  - Go to folder chart
  - run: `npm install`
  - run: `npm run dev`
  - Adjust API url to point the API service


## How to run test
```
$ npm run test:detail
```


## How to use docker
```
Build & running docker container:
$ docker-compose up --build -d

Shutdown docker:
$ docker-compose down --remove-orphans
```


## Swagger API documentation
Simply access to `http://<api_base_url>/docs`


## Concept Workflow
The project can managed (create, update, and soft delete) data of book, member, and admin. Then the data can be listed as paginated data record.

The admin is the authorized user that can access and managed book, member, and lend-returned book process. So basicly all of the API endpoint are protected by auth (require admin to login first), except endpoint for: login and show the report is unprotected.

So, based on above case actually the project should consists of:
1 backend, 2 frontend (dashboard CMS for manage book, member, lend book, return book & chart report)

But because the limitation of time and it wasn't requested in the requirements either. So, i don't create the frontend for CMS. I just only create 1 frontend to show publicly a chart of most borrowed book and lending trend per month. Why it show publicy, because this data can attract member to borrow book. So, it's a good idea to show this data publicly.


## Fullfilled Requirements
[v] RESTful API for Books CRUD operations<br/>
[v] Lending records management<br/>
[v] Analytics endpoint for dashboard<br/>
[v] Use Prisma ORM<br/>
[v] Design schema implementation Books & Lending<br/>
[v] API documentation using Swagger<br/>
[v] Have a unit test with coverage around 80%<br/>
[v] Typescript implementation<br/>
[v] Use dockerized<br/>
[v] Seeder for demo purposes<br/>
[v] UI implementation for frontend<br/>


## Extras
[v] Use jwt for login process<br/>
[v] Hash password using Argon2 which is modern hashing algoritm<br/>
[v] Rate limit for all endpoint<br/>
