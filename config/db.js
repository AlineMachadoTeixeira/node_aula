const oracledb = require("oracledb");
require("dotenv").config();

async function initialize() {
  await oracledb.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
  });
  console.log("Pool de conexões inicializado");
}

async function close() {
  await oracledb.getPool().close();
  console.log("Pool de conexões fechado");
}

async function execute(query, binds = [], options = {}) {
  let connection;
  options.outFormat = oracledb.OUT_FORMAT_OBJECT;

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, binds, options);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = {
  initialize,
  close,
  execute,
};
