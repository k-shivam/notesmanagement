const Note = require('../models/note');
const logger = require('../logger');

const getAllNotes = async (req, res) => {
  logger.info(`Inside getAllNotes function...`)
  try{
    const notes = await Note.find({user: req.userId});
    res.json(notes);
  }catch(error){
    logger.error(`Getting error while fetching the notes ${error}`);
    res.status(500).json({message:"Internal Server Errror"});
  }
};

const createNote = async (req, res) => {
  logger.info(`Inside createNote function....`);
  const {title, content} = req.body;
  try{
    const newNote = new Note({
      title,
      content,
      user: req.userId
    })
    await newNote.save();
    logger.info(`Note Created successfully...`)
    res.status(201).json(newNote);
  }catch(error){
    logger.error(`Getting error while creating a note ${error}`);
    res.status(500).json({message:"Internal Server Error"});
  }
};

const getNote = async (req, res) => {
  logger.info(`Inside getNote function...`)
  const noteId = req.params.noteId;
  try{
    const note = await Note.findOne({ _id: noteId, user: req.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  }catch(error){
    logger.error(`Getting Error while getting note by ${noteId} : ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateNote = async (req, res) => {
  logger.info(`Inside updateNote function...`)
  const noteId = req.params.noteId;
  const { title, content } = req.body;
  try{
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: req.userId },
      { title, content },
      { new: true }
    );
    if (!this.updateNote){
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  }catch(error){
    logger.error(`Getting Error while updating ${noteId} : ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteNote = async (req, res) => {
  logger.info(`Inside deleteNote function...`)
  const noteId = req.params.noteId;
  try{
    const deletedNote = await Note.findOneAndDelete({ _id: noteId, user: req.userId });
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(deletedNote);
  }catch(error){
    logger.error(`Getting Error while deleteing ${noteId}: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const searchNotes = async (req, res) => {
  logger.info(`Inside searchNotes function...`)
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required for search' });
  }

  try {
    const notes = await Note.find({
      $and: [{ user: req.userId }, { $text: { $search: keyword } }],
    }).exec();

    res.json(notes);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
  searchNotes
}

