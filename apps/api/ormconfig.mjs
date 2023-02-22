import { DataSource } from "typeorm"

const instance = new DataSource({
  type: 'postgres',
  url: "postgresql://root:123456@localhost:5432/my_db",
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  // ssl: {
  //   rejectUnauthorized: false,
  // },
})


export default instance
