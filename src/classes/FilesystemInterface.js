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
}

module.exports = FilesystemInterface