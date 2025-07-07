const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const dayjs = require('dayjs');

// Middleware to check authentication
const isAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect('/auth/login');
  next();
};

// List Notes
router.get('/', isAuth, async (req, res) => {
  const notes = await Note.find({ userId: req.session.user._id }).sort({ title: 1 });
  const formattedNotes = notes.map(note => ({
    ...note.toObject(),
    formattedDate: dayjs(note.createdAt).format('DD MMM YYYY, hh:mm A')
  }));
  res.render('notes/index', { notes: formattedNotes });
});

// ✅ Create Note Form (MUST come before /:id)
router.get('/new', isAuth, (req, res) => {
  res.render('notes/new', { title: '', description: '', error: '' });
});

// ✅ Create Note
router.post('/', isAuth, async (req, res) => {
  const { title, description } = req.body;

  const existing = await Note.findOne({ title, userId: req.session.user._id });
  if (existing) {
    return res.render('notes/new', {
      title,
      description,
      error: '❌ Note with this title already exists.'
    });
  }

  await Note.create({ title, description, userId: req.session.user._id });
  req.flash('success', '✅ Note created successfully!');
  res.redirect('/notes');
});

// ✅ Edit Note Form
router.get('/:id/edit', isAuth, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render('notes/edit', {
    note,
    error: '',
    successMessage: ''
  });
});

// ✅ Update Note
router.put('/:id', isAuth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const duplicate = await Note.findOne({
      title,
      userId: req.session.user._id,
      _id: { $ne: req.params.id }
    });

    if (duplicate) {
      const note = await Note.findById(req.params.id);
      return res.render('notes/edit', {
        note,
        error: '❌ A note with this title already exists!',
        successMessage: ''
      });
    }

    await Note.findByIdAndUpdate(req.params.id, { title, description });

    const updatedNote = await Note.findById(req.params.id);

    return res.render('notes/edit', {
      note: updatedNote,
      error: '',
      successMessage: '✅ Note updated successfully!'
    });

  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong while updating.');
    res.redirect('/notes');
  }
});

// ✅ View Note
router.get('/:id', isAuth, async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.session.user._id });
  res.render('notes/show', { note });
});

// ✅ Delete Note
router.delete('/:id', isAuth, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.session.user._id });
  req.flash('success', '🗑️ Note deleted!');
  res.redirect('/notes');
});

module.exports = router;
