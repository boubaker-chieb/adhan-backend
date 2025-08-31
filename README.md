
<div align="center">
  <h1>🕌 Adhan Backend</h1>
  <img src="https://em-content.zobj.net/source/microsoft-teams/363/mosque_1f54c.png" alt="Mosque Logo" width="100" />
</div>

This project is a NestJS backend application using Prisma ORM and PostgreSQL.

Adhan Backend provides RESTful APIs for managing prayer times and related data. It handles user authentication, CRUD operations for prayer schedules, and integrates with external services to calculate accurate prayer times based on location. The backend ensures secure data access and supports scalable deployment for mosque and community applications.


## ⚡ Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (installed and running)
- [pnpm](https://pnpm.io/) (recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) (optional)
- [Prisma CLI](https://www.prisma.io/docs/getting-started)


## 🚀 Setup

1. **Clone the repository:** 🛠️
    ```bash
    git clone <repository-url>
    cd adhan-backend
    ```

2. **Install dependencies:** 📦
    ```bash
    pnpm install
    # or
    yarn install
    # or
    npm install
    ```

3. **Configure PostgreSQL:** 🗄️
    - Create a PostgreSQL database.
    - Update the `DATABASE_URL` in `.env` file:
      ```
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
      ```


## 🧩 Prisma Commands

- **Generate Prisma Client:**
  ```bash
  npx prisma generate
  ```

- **Run Prisma Migrations:**
  ```bash
  npx prisma migrate dev
  ```


## 🤝 Contributing

Every contribution is welcome! Feel free to open issues or submit pull requests.


## 🔗 Useful Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
