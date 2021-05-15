const router = require('express').Router();

const store = require('../db/store');

router.get('/api/notes', (req, res) => {
    store.getNotes().then((notes) => {
        res.json(notes)
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
})

router.post('/api/notes', (req, res) => {
    console.log(req.body)
    store.writeNotes(req.body).then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
})

router.delete('/api/notes/:id', (req, res) => {
    store.deleteNotes(req.params.id).then(() => {
        return res.json({ ok: true })
    }).catch((err) => res.status(500).json(err))
})

module.exports = router;