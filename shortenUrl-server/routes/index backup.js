var express = require('express')
var router = express.Router()

const fs = require('fs')
const XLSX = require("xlsx")

const filePath = 'D:/cdcUrl/cdcUrl.xlsx'


const workbook = XLSX.readFile(filePath)

// const workbook = XLSX.readFileSync(filePath)
const ws = workbook.Sheets[workbook.SheetNames[0]]
const jsa = XLSX.utils.sheet_to_json(ws)


fs.watch(filePath, (event, filename) => {
  if (filename) {
    const workbook = XLSX.readFileSync(filePath)
    const ws = workbook.Sheets[workbook.SheetNames[0]]
    const jsa = XLSX.utils.sheet_to_json(ws)

    router.get('/', function (req, res, next) {
      res.json(jsa)
    })

  }
})


//  隨機取得由大小寫及數字組成的亂數
const randomCode = (digits) => {
  let text = ""
  // let code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let code = "123"

  for (let i = 0; i < digits; i++)
    text += code.charAt(Math.floor(Math.random() * code.length))
  return text
}

const checkRepeatUrl = (originUrl) => {
  init()
  console.log(result, jsa)
  const result = jsa.find((item) => {
    console.log(item)
    return item['原網址'] == originUrl
  })
  if (result == undefined) {
    return checkRepeatCode(randomCode(2))
  } else {
    return item['短網址代碼']
  }
}

const checkRepeatCode = (code) => {
  init()
  const result = jsa.find((item) => {
    return item['短網址代碼'] == code
  })
  if (result == undefined) {
    return code
    // checkRepeatCode(randomCode(2))
  } else {
    checkRepeatCode(randomCode(2))
  }
}




//短網址導向
router.get('/:code', ((req, res, next) => {
  if (req.params.code && req.params.code != 'undefined') {
    jsa.map((item) => {
      if (item['短網址代碼'] == req.params.code) {
        res.redirect(item['原網址'])
      }
    })
  }
}))

router.get('/', function (req, res, next) {
  res.json(jsa)
})

router.post('/', function (req, res, next) {
  // 在這裡處理 POST 請求，例如將使用者資料儲存到資料庫中
  const originUrl = req.body["原網址"]
  const postData = []
  // postData.push({ "原網址": originUrl, '短網址代碼': code })
  const finalCode = checkRepeatUrl(originUrl)
  postData[0] = { "原網址": originUrl, '短網址代碼': finalCode }

  XLSX.utils.sheet_add_json(ws, postData, {
    skipHeader: true,
    origin: -1
  })

  XLSX.writeFileXLSX(workbook, filePath)

  res.send(postData[0])
  fs.writeFileSync('./test2.json', JSON.stringify(workbook), (err) => {
    err ? err : 'Succcess'
  })
})

module.exports = router
