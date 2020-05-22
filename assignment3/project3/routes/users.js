var express = require('express');
var router = express.Router();
let User = require('../models/user');
let responseMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');
let util = require('../modules/util');
let encryption = require('../modules/encryption');

/* GET users listing. */
router.post('/signup',async(req, res)=>{
  const {id, name, password, email} = req.body;
  if( !id || !name || !password || !email){
    return res.status(400).send({message: 'BAD REQUEST'});
  }
  if (User.filter(user => user.id == id).length >0){
    return res.status(400).send({message: 'ALREADY ID'});
  } 

  const salt = encryption.encryptWithSalt();
  const hashed = encryption.encrypt(password.salt)
  User.push({id, name, password,salt, hashed, email});
  res.status(200).send(User)
});

router.post('/signin', async(req, res)=>{
  //request body data
  const {id, password} = req.body;
  //request body 확인(없으면 null value)
  if(!id || !password){
    return res.status(400).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALE));
  }
  //존재하는 id인지(없다면 no user)
  const user = User.filter(user = user.id == id);
  if(User.length ==0){
    return res.status(400).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  //비밀번호 확인(없다면 miss match password)
  if(user[0].password != encryption.encrypt(password, user[0].salt)){
    return res.status(400).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PASSWORD));
  }
  //성공 (login success + userId)
  console.log('login success');
  return res.status(200).send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {userId: id}));


})

router.get('/profile/:id', async (req, res)=>{
  //request params에서 데이터 가져오기
  const id = req.params.id;
  const user = User.filter(user => user.userIdx == id[0]);
  // 존재하는 아이디(/NO USER)
  if (!user){
    return res.status(400).send(util.false(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }
  // 성공 -login success + userId
  return res.status(200).send(util.success(statusCode.OK,responseMessage.READ_PROFILE_SUCCESS,{userId :id}));
});

module.exports = router;
