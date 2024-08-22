module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  pgUser: 'db_user',
  pgHost: 'postgres-cluster-ip-service',
  pgDatabase: 'db_name',
  pgPassword: 'db_pass',
  pgPort: 15432,
  // pgUser: process.env.PGUSER,
  // pgHost: process.env.PGHOST,
  // pgDatabase: process.env.PGDATABASE,
  // pgPassword: process.env.PGPASSWORD,
  // pgPort: process.env.PGPORT
}
