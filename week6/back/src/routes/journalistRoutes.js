import express from 'express';
import * as journalistController from '../controllers/journalistController.js';

const router = express.Router();

// Get all journalists
router.get('/', journalistController.getJournalists);

// Get journalist by ID
router.get('/:id', journalistController.getJournalistById);

// Get all articles by journalist ID
router.get('/:id/articles', journalistController.getArticlesByJournalist);

// Create new journalist
router.post('/', journalistController.createJournalist);

// Update journalist
router.put('/:id', journalistController.updateJournalist);

// Delete journalist
router.delete('/:id', journalistController.deleteJournalist);

export default router;
