var express = require('express');
var router = express.Router();
var userHelper = require('../HELPER/userHelper');


router.post('/create', async (req, res) => {
    let body = req.body;
    let userResponse = await userHelper.createUser(body);
    console.log('RESPONSE IN CREATE', userResponse);
    res.json(userResponse);
});

router.post('/list', async (req, res, next) => {
    let body = req.body;
    let listUser = await userHelper.getUserData(body);
    console.log('RESPONSE IN listUser', listUser);
    res.json(listUser);
});

router.get("/getDetails/:id",  async (req, res) => {
    let userId = req.params.id;
    let editUser = await userHelper.getUserDetailsUsingId(userId);
    console.log('RESPONSE IN getDetails', editUser);
    res.json(editUser);
});

module.exports = router;