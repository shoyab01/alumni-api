var express = require('express');
var router = express.Router();
const admin = require('../config/firebase-config');
router.use(express.json());
router.use(express.urlencoded({extended: true}));

const firestore = admin.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testAPI', function(req, res, next) {
  res.send("Test API working fine");
});

router.post('/signup', async (req, res) => {
  const userResponse = await admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: true,
    disabled: false
  });
  res.json(userResponse);
});

router.post('/createUser', async(req, res) => {
  const data = req.body;
  const users = firestore.collection("Users");
  await users.add(data);
  res.json(data);
});

module.exports = router;
