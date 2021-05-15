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
            console.log(notes)
            let readNotes;

            try {
                readNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                readNotes = []
            }
            return readNotes
        });
    }

    write(notes) {
        writeFileAsync('db/db.json', JSON.stringify(notes))
    }
    writeNotes(note) {
        const { title, text } = note
        const newNote = { title, text, id: uuidv4() }
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updated) => this.write(updated))
            .then(() => newNote)
    }

    deleteNotes(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((updatedNotes) => writeFileAsync('db/db.json', JSON.stringify(updatedNotes)))
    }

}


module.exports = new Store()