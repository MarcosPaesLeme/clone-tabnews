import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const version = await database.query("SHOW SERVER_VERSION;");
  const maxCon = await database.query("SHOW MAX_CONNECTIONS;");
  const dbName = process.env.POSTGRES_DB;
  const openConnections = await database.query({
    text: `SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [dbName],
  });

  return response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: version.rows[0].server_version,
        max_connections: parseInt(maxCon.rows[0].max_connections),
        opened_connections: openConnections.rows[0].count,
      },
    },
  });
}

export default status;
