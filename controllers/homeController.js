const userModel = require("../models/userModel_oracle");

const homeController = {
  index: (req, res) => {
    res.render("index", {
      title: "MVC com Express", // Passando o título
      message: "Bem-vindo à aplicação MVC!", // Passando a mensagem
    });
  },

  listUsers: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createUser: async (req, res) => {
    const newUser = req.body;
    try {
      const id = await userModel.createUser(newUser);
      res.status(201).json({ id, ...newUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    try {
      await userModel.updateUser(id, updatedUser);
      res.status(200).json({ id, ...updatedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await userModel.deleteUser(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = homeController;
