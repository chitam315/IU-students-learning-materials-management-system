import express from 'express';
const router = express.Router();
import fileController from '../app/controllers/fileController.js'

router.get('/:filename',fileController.getAllFiles)

export default router