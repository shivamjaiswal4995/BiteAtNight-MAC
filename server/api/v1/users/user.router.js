const router = require('express').Router();
const isAuthenticated = require('../auth/authController');
const userController = require('./user.controller');

router.get('/',/* isAuthenticated,*/ (req, res) => {
    userController.getAllUsers((err, users) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).json(users);
        }
    });
});

router.post('/isAuthenticated', isAuthenticated, (req, res) => {
    return res.status(200).json({isAuthenticated: true});
})

router.post('/signin', (req, res) => {
    if(req.body && req.body.userEmail && req.body.password) {
        let userObj = {
            userEmail: req.body.userEmail,
            password: req.body.password
        }
        //here we are not mentioning done as argument in findUser?
        userController.findUser(userObj, (err, generatedToken) => {
            if(err) {
                console.log(err.message);
                return res.status(401).json(err);
            } else {
                return res.status(200).send(generatedToken);
            }
        });
    } else {
        return res.status(401).send('Invalid credentials!');
    }
});

router.post('/register', (req, res) => {
    console.log("reached server side");
    console.log(req.body);
    if(req.body && req.body.userEmail && req.body.password && req.body.contact && req.body.userName) {
        let userObj = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            password: req.body.password,
            contact: req.body.contact
        };
        userController.addUser(userObj, (err, generatedToken) => {
            if(err) {
                return res.status(500).send("There was some problem registering the user!");
            } else {
                return res.status(200).send(generatedToken);
            }
        });
    }else {
        res.status(401).send('Please provide all the necessary details!');
    }
});

router.get('/profile', isAuthenticated, (req, res) => {
    let userId = req.userId;
    userController.userProfile(userId, (err, result) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

router.post('/findUserByEmail', (req,res) => {
    let userEmail = req.body.userEmail;
    userController.findUserByEmail(userEmail, (err,result) => {
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.post('/findUserByContactNo', (req,res) => {
    let contactNo = req.body.contactNo;
    userController.findUserByContactNo(contactNo, (err,result) => {
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(result);
        }
    });
});

module.exports = router;