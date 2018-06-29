// cp -rf ./* /home/wwwroot/articles.jerryshi.com

const ejs = require('ejs')
const glob = require('glob')
const fs = require('fs')

const pathList = ['./reading', './learning/fe', './learning/node', './learning/python', './learning/other']

function getContents(p) {
  let list = []

  const tpl = 
`---
sidebar: false
---

# CONTENTS
<% for(let i=0; i < data.length; i++) { %>
* [<%= data[i].name %>](<%= data[i].path %>)
<% } %>`

  ~(async () => {
    let ll = glob.sync(p + '/**/*.md').filter(i => i.indexOf('index') < 0)

    await Promise.all(
      ll.map(async path => {
        const data = await fs.readFileSync(path, 'utf8')
        const firstLine = data.split('\n')[0]
        if (firstLine[0] !== '#') {
          console.log('文件:' + path, '存在格式问题')
        } else {
          list.push({
            name: firstLine.replace('# ', ''),
            path: path.replace('.', '')
          })
        }
      })
    )

    const rr = ejs.render(tpl, {
      data: list
    })

    fs.writeFile(p + '/index.md', rr, err => {
      if (err) console.error(err)
      else console.info('写入 ' + p + '/index.md 成功')
    })
  })()
}

pathList.forEach(getContents)
