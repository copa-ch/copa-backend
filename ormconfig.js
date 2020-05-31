const path = require('path') // eslint-disable-line
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`),
})

function env(key) {
  return envConfig.parsed[key] || process.env[key]
}

const baseConfig = {
  type: env('DB_DIALECT'),
  database: env('DB_DATABASE'),
  entities: [path.resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/**/*.ts')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  cli: {
    migrationsDir: path.resolve('src/database/migrations'),
  },
}

if (process.env.NODE_ENV !== 'test') {
  module.exports = {
    host: env('DB_HOST'),
    port: env('DB_PORT'),
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    synchronize: false,
    ...baseConfig,
  }
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  }
}
