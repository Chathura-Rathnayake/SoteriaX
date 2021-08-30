module.exports= {
getData: async (db, admin) => {
    console.log("came here 2");
     admin
        .auth()
        .verifyIdToken(req.body.token)
        .then(() => {
            console.log("came here 3");
            const data = db.collection('lifeguards');
            const snapshot = await citiesRef.where('accountStatus', '==', true).get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            snapshot.forEach(doc => {
                console.log("came here 4");
                console.log(doc.data().firstName, "", doc.data().lastName);
            });
        })
}


}



// module.exports = {
//     getData: async function (db, admin) {
//         console.log("came here 2");
//         admin
//             .auth()
//             .verifyIdToken(req.body.token)
//             .then(() => {
//                 console.log("came here 3");
//                 const data = db.collection('lifeguards');
//                 const snapshot = await citiesRef.where('accountStatus', '==', true).get();
//                 if (snapshot.empty) {
//                     console.log('No matching documents.');
//                     return;
//                 }
//                 snapshot.forEach(doc => {
//                     console.log("came here 4");
//                     console.log(doc.data().firstName, "", doc.data().lastName);
//                 });
//             })
//     }


// }