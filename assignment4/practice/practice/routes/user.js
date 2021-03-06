var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
router.post('/signup', async (req, res) => {
    const {
        id,
        name,
        password,
        email
    } = req.body;
    // request data 확인 - 없다면 Bad Request 반환
    if (!id || !name || !password || !email) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    //already ID
    /*if (User.filter(user => user.id == id).length > 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }*/
    //사용중인 아이디 있는지 확인
    if (User.checkUser(user)){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }
    const salt = '';
    //User.push({id,name,password,email});
    const idx = await User.signup(id, name, password, salt, email);
    if(idx === -1){
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: id}));
});

/* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
    REQUEST BODY : id, name
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/
router.post('/signin', async (req, res) => {
    // request body 에서 데이터 가져오기
    const {
        id,
        name,
        password,
        email
    } = req.body;
    // request data 확인 - 없다면 Null Value 반환
    if (!id || !password) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    const user = User.filter(user => user.id == id);
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (user.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    // 비밀번호 확인 - 없다면 Miss match password 반환
    if (user[0].password !== password ) {
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id}));
});

module.exports = router;