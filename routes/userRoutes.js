const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.list);
router.get("/new", userController.showCreateForm);
router.get("/:id/edit", userController.showEditForm);

router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
