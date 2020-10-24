const fs = require("fs")

class FilesystemInterface {
    promiseBasedRead(inputPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(inputPath, 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                }
                
                resolve(data)
            })
        })
    }

    promiseBasedWrite(inputPath, textToWrite) {
        return new Promise((resolve, reject) => {
            fs.writeFile(inputPath, textToWrite, 'utf8', (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(err)
                }
            })
        })
    }
}

module.exports = FilesystemInterface