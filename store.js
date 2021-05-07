const fs = require('fs')
const util = require('util')
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }

    getNotes() {
        return this.read().then((notes) => {
            return JSON.parse(notes)
        });
    }

    writeNotes(note) {
        const { title, text } = note
        const newNote = { title, text, id: uuidv4() }
        return this.getNotes().then((notes) => [...notes, newNote]).then((updated) => writeFileAsync('db/db.json', JSON.stringify(updated))).then(() => newNote)
    }

    deleteNotes(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((updatedNotes) => writeFileAsync('db/db.json', JSON.stringify(updatedNotes)))
    }

}


module.exports = new Store()