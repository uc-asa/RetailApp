const admin = require("firebase-admin");

const serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://retails-pulse-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  files.forEach(function(file) {

    const menu = require("./files/" + file);
    console.log(menu.length);
    for (let i in menu) {
      const item = menu[i];
      for (let j in item) {
        firestore
        .collection(i)
        .doc(j)
        .set(item[j])
        .then(function(docRef) {
          console.log("Document written");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      }
  });
});
