const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp()
const db = admin.database();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.updateTime = functions.https.onRequest((request, response) => {
    const day = request.query.day;
    if (day === undefined) {
        response.status(500).send('Failed!')
        return
    }
    db.ref('status').update({
        [day]: Date.now()
    })
    response.send('Finished!')
})

exports.status = functions.https.onRequest(async (request, response) => {
    const data = await (await db.ref('status').once('value')).val();
    const d = new Date();
    d.setHours(0,0,0,0)
    let day = d.getDay();
    console.log({data})
    response.send({
        'day': day,
        'status': data[day.toString()] >= d.getTime(),
        'old': d.getTime(),
        'current': data[day.toString()],
    })
})