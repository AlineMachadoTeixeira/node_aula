const express = require("express");
const app = express();
const methodOverride = require("method-override");
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const db = require("./config/db"); // Importe o módulo de conexão com Oracle
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/home", homeRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.redirect("/home");
});

async function startServer() {
  try {
    await db.initialize(); // Inicializa a conexão com o Oracle

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao inicializar o banco de dados:", err);
    process.exit(1); // Encerra a aplicação se o banco não puder ser inicializado
  }
}

startServer(); // Chama a função para iniciar o servidor corretamente
