const express = require("express");
const router = express.Router();
const petsController = require('../controllers/petsController');
const petValidators = require('../validations/petValidator');
const jwtToken = require('../validations/jwtValidation')

router.get('/pet', jwtToken.validateToken, petValidators.id, petsController.getPet);
router.get('/pets', jwtToken.validateToken, petsController.getPets);
router.post('/pet', jwtToken.validateToken, petValidators.add, petsController.postPet);
router.post('/login', petValidators.id, petsController.getLogin);
router.put('/pet', jwtToken.validateToken, petValidators.update, petsController.putPet);
router.delete('/pet', jwtToken.validateToken, petValidators.id, petsController.deletePet);

module.exports = router;