const router = require('express').Router();

const store = require('../db/Store');

router.get('/notes', (req, res) => {
    store.getNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
})

router.post('/notes', (req, res) => {
    console.log(req.body)
    store.writeNotes(req.body).then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
})

module.exports = router;