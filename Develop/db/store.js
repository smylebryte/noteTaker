const fs = require('fs')
const util = require('util')

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

    write() {
        return writeFileAsync('db/db.json', 'utf8')
    }

    saveNote() {
        return this.write().then((notes) => {
            return JSON.parse(notes)
        })
    }



}


module.exports = new Store()