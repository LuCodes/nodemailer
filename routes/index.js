const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'tmp/',
    limits: { fileSize: 3145728 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== 'image/png') {
        return cb(null, false);
      }
      cb(null, true);
    }
  });
const fs = require('fs');

router.post('/uploaddufichier', upload.array('monfichier', 3), function (req, res, next) {
    for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].size < 3145728 && req.files[i].mimetype == "image/png") {
          fs.rename(req.files[i].path, "public/images/" + req.files[i].originalname,
            function(err) {
              if (err) {
                res.send("Erreur");
              } else {
                res.send("Fichier chargé");
              }
            }
          );
        } else {
          res.send("Fichier trop lourd ou mauvais format");
        }
      }
    });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

const nodemailer = require('nodemailer');

const app = express();

// Création de la méthode de transport de l'email 
/* const smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});

smtpTransport.sendMail({
    from: "Deer Super grandma <gmail.user@yopmail.com", // Expediteur
    to: "supergrandma@yopmail.com", // Destinataires
    subject: "cookie", // Sujet
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}, (error, response) => {
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
}); */

app.listen(3001, () => console.log('server started...'));
