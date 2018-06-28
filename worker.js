const { resolve } = require('path')
const glob = require('glob')
const _ = require('lodash')
const R = require('ramda')
const fs = require('fs')
const readline = require('linebyline')

// const list = glob.sync(resolve(__dirname, './notes/reading/**/*.md'))
const list = glob.sync('./notes/reading/**/*.md').forEach(i => {
  if (i) {
    fs.readFile(i, 'utf8', (err, data) => {
      if (err) { throw new Error(err) }
      else {
        try {
          const firstLine = data.split('\n')[0]
          if (firstLine[0] !== '#') {
            console.log('文件:' + i, '存在格式问题')
          }
        } catch (error) {
          console.error(error)
        }
      }
    })
  }
})