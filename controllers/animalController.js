const Animal = require('../models/Animal');

// 🔍 Listar todos os animais
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate('reporter', 'name email');
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🐾 Obter animal por ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('reporter', 'name email');
    if (!animal) return res.status(404).json({ msg: 'Animal não encontrado' });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➕ Criar animal (requer autenticação)
exports.createAnimal = async (req, res) => {
  const { species, description, photoUrl, location, dateFound } = req.body;
  try {
    const newAnimal = new Animal({
      species,
      description,
      photoUrl,
      location,
      dateFound,
      reporter: req.user.id,
    });
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Atualizar animal
exports.updateAnimal = async (req, res) => {
  try {
    const updated = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Animal não encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🗑️ Apagar animal
exports.deleteAnimal = async (req, res) => {
  try {
    const removed = await Animal.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ msg: 'Animal não encontrado' });
    res.json({ msg: 'Animal removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Confirmar avistamento (gamificação futura)
exports.confirmSight = async (req, res) => {
  const { photoUrl, comment } = req.body;

  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ msg: 'Animal não encontrado' });

    // Verificar se o utilizador já confirmou este animal
    const alreadyConfirmed = animal.confirmations.some(
      (conf) => conf.user.toString() === req.user.id
    );
    if (alreadyConfirmed) {
      return res.status(400).json({ msg: 'Já confirmaste este avistamento' });
    }

    // Adiciona confirmação ao array
    animal.confirmations.push({
      user: req.user.id,
      photoUrl,
      comment,
    });

    await animal.save();
    res.status(201).json({ msg: 'Confirmação registada com sucesso', animal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

