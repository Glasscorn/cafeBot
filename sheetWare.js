require('dotenv').config()
const { google } = require ("googleapis")

const auth = new google.auth.GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),

})

const setData = async arr => {

    const client = await auth.getClient()
    const googleSheets = google.sheets({version: "v4",auth: client})
    const spreadsheetId = process.env.SPREADSHEET_ID

    const request = {
        auth,
        spreadsheetId,
        range: `${process.env.SHEET_DB_NAME}!A1:C1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "majorDimension": "ROWS",
            "values": arr
        }
    }

    try {

        const response = (await googleSheets.spreadsheets.values.append(request)).data
        console.log(JSON.stringify(response, null, 2))

    } catch (err) {

        console.error(err)

    }

}

module.exports.sheetWare = {
    setData
}