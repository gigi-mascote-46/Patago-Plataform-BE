const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  confirmSight
} = require('../controllers/animalController');

// 📋 Listar todos os animais
// GET /api/animals
router.get('/', getAllAnimals);

// 🔍 Detalhes de um animal específico
// GET /api/animals/:id
router.get('/:id', getAnimalById);

// ➕ Criar novo animal (requer autenticação)
// POST /api/animals
router.post('/', authMiddleware, createAnimal);

// ✏️ Atualizar animal existente
// PUT /api/animals/:id
router.put('/:id', authMiddleware, updateAnimal);

// 🗑️ Apagar animal
// DELETE /api/animals/:id
router.delete('/:id', authMiddleware, deleteAnimal);

// ✅ Confirmar avistamento (gamificação)
// POST /api/animals/:id/confirm
router.post('/:id/confirm', authMiddleware, confirmSight);

module.exports = router;
