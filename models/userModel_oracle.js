const db = require("../config/db");

async function getAllUsers() {
  const query = `SELECT * FROM users`;
  const result = await db.execute(query);
  return result.rows;
}

async function getUserById(id) {
  const query = `SELECT * FROM users WHERE id = :id`;
  const binds = { id };
  const result = await db.execute(query, binds);
  return result.rows[0];
}

async function createUser(user) {
  const query = `INSERT INTO users (name, email) VALUES (:name, :email) RETURNING id INTO :id`;
  const binds = {
    name: user.name,
    email: user.email,
    id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
  };
  const result = await db.execute(query, binds);
  return result.outBinds.id[0];
}

async function updateUser(id, user) {
  const query = `UPDATE users SET name = :name, email = :email WHERE id = :id`;
  const binds = { id, name: user.name, email: user.email };
  await db.execute(query, binds);
}

async function deleteUser(id) {
  const query = `DELETE FROM users WHERE id = :id`;
  const binds = { id };
  await db.execute(query, binds);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
