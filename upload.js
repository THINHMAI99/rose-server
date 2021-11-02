const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const db = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
    var lastDotIndex = file.lastIndexOf(".");

    var menu = require("./files/" + file);

    menu.forEach(function(obj) {
      firestore
        .collection(file.substring(0, lastDotIndex)) //Lấy tên file làm tên colection
        .doc(obj.orchid_id)
        .set(obj)
        .then(function(docRef) {
          console.log("Document written");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    });
  });
});


// const express = require('express');
// const multer = require('multer');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, './images');
//   },
//   filename(req, file, callback) {
//     callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// app.get('/', (req, res) => {
//   res.status(200).send('You can post to /api/upload.');
// });

// app.post('/api/upload', upload.array('photo', 3), (req, res) => {
//   console.log('file', req.files);
//   console.log('body', req.body);
//   res.status(200).json({
//     message: 'success!',
//   });
// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log(
//     `server is running at http://localhost:${process.env.PORT || 3000}`
//   );
// });

