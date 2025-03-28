const UserModel = require("../models/UserModel");

exports.list = async (req, res) => {
  try {
    const usuarios = await UserModel.getAllUsers(); // Alterado de findAll() para getAllUsers()
    res.render("cadastrar", { title: "Lista de Usuários", usuarios });
  } catch (err) {
    res.status(500).send("Erro ao listar usuários: " + err.message);
  }
};

exports.showCreateForm = (req, res) => {
  res.render("cadastrar/form", {
    title: "Criar Usuário",
    usuario: {},
    action: "/users",
    method: "POST",
  });
};

exports.showEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.getUserById(id);
    if (!usuario) {
      return res.status(404).send("Usuário não encontrado!");
    }
    res.render("cadastrar/form", {
      title: "Editar Usuário",
      usuario,
      action: `/users/${id}?_method=PUT`,
      method: "POST",
    });
  } catch (err) {
    res.status(500).send("Erro ao buscar usuário: " + err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email } = req.body;
    await UserModel.createUser({ name, email });
    res.redirect("/users");
  } catch (err) {
    res.status(500).send("Erro ao criar usuário: " + err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await UserModel.updateUser(id, { name, email }); // Alterado de update() para updateUser()
    res.redirect("/users");
  } catch (err) {
    res.status(500).send("Erro ao atualizar usuário: " + err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.deleteUser(id); // Alterado de delete() para deleteUser()
    res.redirect("/users");
  } catch (err) {
    res.status(500).send("Erro ao excluir usuário: " + err.message);
  }
};
