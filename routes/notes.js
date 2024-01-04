const express = require('express');
const router = express.Router();
const {searchNotes, getAllNotes, createNote, getNote, updateNote, deleteNote} = require('../controllers/noteController');
const authenticateUser = require('../middlewares/authMiddleware');

router.get('/search', authenticateUser, searchNotes);
router.get('/', authenticateUser, getAllNotes);
router.post('/', authenticateUser, createNote);
router.get('/:noteId', authenticateUser, getNote);
router.put('/:noteId', authenticateUser, updateNote);
router.delete('/:noteId', authenticateUser, deleteNote);


module.exports = router;
