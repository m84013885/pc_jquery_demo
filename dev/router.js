const fs = require('fs')
const path = require('path')
const titleReg = new RegExp('@title', 'g')
const commonReg = new RegExp('@common', 'g')
const nameReg = new RegExp('@className', 'g')
const cssReg = new RegExp('@css', 'g')
const { routers } = require('../config.json')
const { common } = require('../config.json')
const SRC_PATH = [
  path.resolve(__dirname, `./temp/index.html`),
  path.resolve(__dirname, `./temp/index.js`),
  path.resolve(__dirname, `./temp/css.css`)
]
const tempNameArr = [
  'index.html',
  'index.js',
  'css.css'
]
function titleCase(str) { str = str.toLowerCase().split(' '); for (const i in str) { str[i] = str[i].replace(str[i].charAt(0), str[i].charAt(0).toUpperCase()) } return str.join(' ') }

async function AddRouter() {
  for (const key in routers) {
    if (routers.hasOwnProperty(key)) {
      const { name, template } = routers[key]
      const routerArr = [
        path.resolve(__dirname, `../app/router/${template}/index.html`),
        path.resolve(__dirname, `../app/router/${template}/index.js`),
        path.resolve(__dirname, `../app/router/${template}/${template}.css`)
      ]
      const fileArr = [false, false, false]
      console.log(`搜查${template}路由是否存在`)
      let res = null
      try {
        res = fs.readdirSync(path.resolve(__dirname, `../app/router/${template}`))
      }
      catch (error) {
        res = null
      }
      if (res) {
        routerArr.map((item, index) => {
          let res = null
          try {
            res = fs.readFileSync(item)
          }
          catch (error) {
            res = null
          }
          if (res) {
            fileArr[index] = true
            console.log(`${tempNameArr[index]} 已存在`)
          }
          else {
            fileArr[index] = false
            console.log(`${tempNameArr[index]} 不存在`)
          }
        })
      }
      else {
        console.log(`${template} 不存在`)
        let res = null
        try {
          res = fs.mkdirSync(path.resolve(__dirname, `../app/router/${template}`))
        }
        catch (error) {
          res = null
        }
        if (res === undefined) { console.log(`创建${template} 成功`) }
      }

      fileArr.map((item, index) => {
        if (!item) {
          let content = null
          try {
            content = fs.readFileSync(SRC_PATH[index], { encoding: 'utf-8' })
            content = content.replace(titleReg, name)
            const classNmae = titleCase(template)
            content = content.replace(nameReg, classNmae)
            content = content.replace(cssReg, `${template}.css`)
            content = content.replace(commonReg, `<script type="text/javascript" src="${common}"></script>`)
            // fs.writeFileSync(path.resolve(__dirname, `../app/router/${template}/${tempNameArr[index]}`), content)
            if (index < 2) {
              fs.writeFileSync(path.resolve(__dirname, `../app/router/${template}/${tempNameArr[index]}`), content)
            } else {
              fs.writeFileSync(path.resolve(__dirname, `../app/router/${template}/${template}.css`), content)
            }
            console.log(`${tempNameArr[index]} 创建成功`)
          }
          catch (error) {
            console.log(1)
            console.log(error)
            content = null
          }
        }
      })
      console.log('')
    }
  }
}
AddRouter()