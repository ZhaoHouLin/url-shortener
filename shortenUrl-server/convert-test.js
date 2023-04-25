
const fs = require('fs')
const XLSX = require("xlsx")

const filePath = 'D:/cdcUrl/cdcUrl.xlsx'

const workbook = XLSX.readFile(filePath)


const ws = workbook.Sheets[workbook.SheetNames[0]]
// const toJson = XLSX.utils.sheet_to_json(ws)
// toJson.push({ "原網址": "https://192.168.68.238/login", "短網址代碼": "aC3qF" })

XLSX.utils.sheet_add_json(ws, [{ "原網址": "https://192.168.68.238/login", "短網址代碼": "aC3qF" }], {
  skipHeader: true,
  origin: -1
})

XLSX.writeFileXLSX(workbook, 'D:/cdcUrl/cdcUrl.xlsx')

// console.log(newResult)
// const jsa = XLSX.utils.sheet_to_json(ws, { range: 'A1:CC700' })
// const result = JSON.stringify(jsa)

// fs.writeFileSync('./test.json', result, (err) => {
//   err ? err : 'Succcess'
// })


// fs.writeFileSync('./test2.json', JSON.stringify(workbook), (err) => {
//   err ? err : 'Succcess'
// })

// xlsx2json(filePath, { Sheet: 'vInfo' }).then(jsonArray => {
//   console.log(jsonArray)

//   fs.writeFileSync('./vmlist.json', JSON.stringify(jsonArray), (err) => {
//     err ? err : 'Succcess'
//     console.log(err)
//   })
// })