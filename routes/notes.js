const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const dayjs = require('dayjs');

// List All Notes
// List All Notes
// List All Notes
// List All Notes (sorted alphabetically by title)
router.get('/', async (req, res) => {
    const notes = await Note.find().sort({ title: 1 }); // 1 for ascending (A-Z), -1 for descending (Z-A)

    const formattedNotes = notes.map(note => ({
        ...note.toObject(),
        formattedDate: require('dayjs')(note.createdAt).format('DD MMM YYYY, hh:mm A')
    }));

    res.render('notes/index', {
        notes: formattedNotes,
        message: req.query.created ? '✅ Note created successfully!' : null
    });
});





// New Note Form
router.get('/new', (req, res) => {
  res.render('notes/new', { title: '', description: '', error: '' });
});



// Create Note
// Create Note (without flash)
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    const existing = await Note.findOne({ title: new RegExp(`^${title}$`, 'i') });

    if (existing) {
      return res.render('notes/new', {
        error: '❌ A note with this title already exists!',
        title,
        description
      });
    }

    await Note.create({ title, description });

    // ✅ Set message in session
    req.session.message = '✅ Note created successfully!';
    res.redirect('/notes');
  } catch (err) {
    console.error(err);
    req.session.message = '❌ Failed to create note.';
    res.redirect('/notes/new');
  }
});




// Show Single Note
router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render('notes/show', { note });
});

// Edit Note Form
router.get('/:id/edit', async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render('notes/edit', { note });
});

// Update Note
router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success', '✅ Your note was updated successfully!');
  res.redirect('/notes');
});

// Delete Note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success', '🗑️ Note deleted!');
  res.redirect('/notes');
});

module.exports = router;
