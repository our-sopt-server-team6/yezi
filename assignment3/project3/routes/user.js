var express = require('express');
var router = express.Router();
let User = require('../models/user');
let responseMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');
let util = require('../modules/util');
//let encrypt = require('../modules/encryption');

const crypto = require('crypto');
/* GET users listing. */
router.post('/signup',async(req, res)=>{
  const {id, name, password, email} = req.body;
  if( !id || !name || !password || !email){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    return;
  }
  const user = User.filter(user => user.id == id);
  if (user.length >0){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
    return;
  }
  
  //level 2
  const salt = crypto.randomBytes(32).toString('hex');
  const hashed = crypto.pbkdf2(password, salt, 1, 32, 'sha512').toString('hex');
  User.push({id, name, password,salt, hashed, email});
  res.status(200).send(User)
  res.status(statusCode.CREATED)
  .send(util.success(statusCode.CREATED, responseMessage.CREATED_USER, {userId : id} ))
});

router.post('/signin', async(req, res)=>{
  //request body data
  const {id, password} = req.body;
  //request body 확인(없으면 null value)
  if(!id || !password){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALE));
    return;
  }
  //존재하는 id인지(없다면 no user)
  const user = User.filter(user => user.id == id);
  if(user.length ==0){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    return;
  }
  //비밀번호 확인(없다면 miss match password)
  if(user[0].password != password){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PASSWORD));
    return;
  }
  //성공 (login success + userId)
  console.log('login success');
  res.status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {userId: id}));
});


router.get('/profile/:id', async (req, res)=>{
  //request params에서 데이터 가져오기
  const id = req.params.id;
  const user = User.filter(user => user.userIdx == id[0]);
  // 존재하는 아이디(/NO USER)
  if (!user){
    res.status(statusCode.BAD_REQUEST)
      .send(util.false(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    return;
  }
  // 성공 -login success + userId
  res.status(statusCode.OK)
  .send(util.success(statusCode.OK,responseMessage.READ_PROFILE_SUCCESS,{userId :id}));

});

module.exports = router;
