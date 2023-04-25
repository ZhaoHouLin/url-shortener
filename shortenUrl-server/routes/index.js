var express = require('express')
var router = express.Router()

const fs = require('fs')
// const XLSX = require("xlsx")

const filePath = 'D:/Web/URL-Shortener/shortenUrl-server/url-data.json'

router.get('/', function (req, res, next) {
  let json = fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) throw err
    const info = data.toString()
    // info = JSON.parse(info)
    return info
  })
  res.send("Created by ZZ")
})

router.post('/', function (req, res, next) {
  let json = fs.readFileSync(filePath, 'utf8', (err, data) => {
    if (err) throw err
    const info = data.toString()
    // info = JSON.parse(info)
    return info
  })

  const originUrl = req.body["原網址"]
  let jsonParse = JSON.parse(json)

  const urlData = {
    "原網址": '',
    "短網址代碼": ''
  }

  const repeat = jsonParse.find((item, idx, arr) => {
    return item["原網址"] == originUrl
  })

  if (repeat == undefined) {
    urlData["原網址"] = originUrl
    // if (checkRepeatCode(1, jsonParse)) {
    //   urlData["短網址代碼"] = checkRepeatCode(1, jsonParse)
    // }
    urlData["短網址代碼"] = checkRepeatCode(5, jsonParse)
    jsonParse.push(urlData)
  } else {
    urlData["短網址代碼"] = repeat["短網址代碼"]
  }

  let result = JSON.stringify(jsonParse)

  fs.writeFile(filePath, result, (err) => {
    if (err) {
      console.error(err)
    }
    console.log('Successful')
  })

  res.send(urlData["短網址代碼"])
})

const checkRepeatCode = (digits, data) => {
  // console.log('data', data)
  const code = randomCode(digits)

  // for (let item of data) {
  //   // console.log(item["短網址代碼"])
  //   if (item["短網址代碼"] == code) {
  //     checkRepeatCode(digits, data)
  //   } else {
  //     return code
  //   }
  // }

  let result = data.find((item) => {
    console.log(code)
    return item["短網址代碼"] == code
  })

  if (result == undefined) {
    return code
  } else {
    checkRepeatCode(digits, data)
  }

}

//  隨機取得由大小寫及數字組成的亂數
const randomCode = (digits) => {
  let code = ""
  let codeList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < digits; i++)
    code += codeList.charAt(Math.floor(Math.random() * codeList.length))
  return code
}


// 短網址導向
router.get('/:code', ((req, res, next) => {
  if (req.params.code && req.params.code != 'undefined') {
    let json = fs.readFileSync(filePath, 'utf8', (err, data) => {
      if (err) throw err
      const info = data.toString()

      return info
    })

    JSON.parse(json).map((item) => {
      if (item['短網址代碼'] == req.params.code) {
        res.redirect(item['原網址'])
      }
    })
  }
}))

// router.get('/', function (req, res, next) {
//   res.json(json)
// })

// router.post('/', function (req, res, next) {

// })

module.exports = router
