require('dotenv').config()
const { google } = require ("googleapis")
const { functions } = require('../bot/functions')


const setData = async (arr,lastColumn) => {

    const auth = new google.auth.GoogleAuth({
        scopes: "https://www.googleapis.com/auth/spreadsheets",
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    
    })
    const client = await auth.getClient()
        const googleSheets = google.sheets({version: "v4",auth: client})
        const spreadsheetId = process.env.SPREADSHEET_ID

    const request_data = {
        auth,
        spreadsheetId,
        range: `${process.env.SHEET_DB_NAME}!A:${lastColumn}`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'OVERWRITE',
        resource: {
            "majorDimension": "ROWS",
            "values": arr
        }
    }

    const request_clear = {
        auth,
        spreadsheetId,
        range: `${process.env.SHEET_DB_NAME}!A:${lastColumn}`
    }

    try {

        await googleSheets.spreadsheets.values.clear(request_clear).data
        await functions.timeout(500) 

    } catch (e) {

        console.error(e)

    }

    try {

        const response = (await googleSheets.spreadsheets.values.append(request_data)).data
        console.log(JSON.stringify(response, null, 2))

    } catch (e) {

        console.error(e)

    }

}

module.exports.sheetWare = {
    setData
}