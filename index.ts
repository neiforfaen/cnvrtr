#!/usr/bin/env node

import * as XLSX from 'xlsx'
import * as readline from 'readline'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const getDownloadPath = () => os.homedir() + '/Downloads'

const cnvrtr = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('Enter the path to the XLSX file: ', (filePath) => {
        const WB = XLSX.readFile(filePath)

        const fileName = path.basename(filePath, '.xlsx')

        const sheetName = WB.SheetNames[0]
        const worksheet = WB.Sheets[sheetName]

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1})

        const headers = jsonData[0] as string[]
        const rows = jsonData.slice(1)

        const result = rows.map((row: any) => {
            const rowObject: {[key: string]: any} = {}
            headers.forEach((header, index) => {
                rowObject[header] = row[index]
            })
            return rowObject
        })

        const downloadPath = `${getDownloadPath()}/${fileName}.json`

        fs.writeFileSync(downloadPath, JSON.stringify(result, null, 2))

        rl.close()
    })
}

cnvrtr()
