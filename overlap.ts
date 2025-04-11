import * as XLSX from 'xlsx'
import * as readline from 'readline'

const getPaths = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question(
        'Enter both file paths, separated by a space ',
        (filePaths: string) => {
            const filePathsArr = filePaths.split(' ')

            const WB1 = XLSX.readFile(filePathsArr[0])
            const WB2 = XLSX.readFile(filePathsArr[1])

            const firstSheetName = WB1.SheetNames[0]
            const secondSheetName = WB2.SheetNames[0]
            const firstWorksheet = WB1.Sheets[firstSheetName]
            const secondWorksheet = WB2.Sheets[secondSheetName]

            console.log(firstWorksheet)

            rl.close()
        }
    )
}

getPaths()
