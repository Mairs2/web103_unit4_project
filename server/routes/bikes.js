import express from "express";
// import controller for custom items
import bikeController from "../controllers/customBike.js";
const { getBikes, getBikeById, createBike, updateBike, deleteBike, getOptions } = bikeController;

const router = express.Router();

// define routes to get, create, edit, and delete items
router.get('/options', getOptions);
router.get('/', getBikes);
router.get('/:id', getBikeById);
router.post('/', createBike);
router.delete('/:id', deleteBike);
router.patch('/:id', updateBike);

export default router;
