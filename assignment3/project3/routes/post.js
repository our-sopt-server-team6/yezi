var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');
// 모든 게시물 조회
router.get('/',async (req, res)=>{
    const {author, title, content, createdAt} = req.body;
    if(!author||!title||!content||!createdAt){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS));
    return;
})
// 게시글 고유 id 값을 조회
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    const post = Post.filter(post => post.postIdx == id);
    if(!id){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
    }
    if(post.length ===0){
        res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.NO_POST));
    }
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, post[0]));
    return;
})
// 게시글 생성
router.post('/', async(req, res)=>{
    const {author, title, content, createdAt} = req.body;
    if(!author||!title||!content||!createdAt){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    Post.push({author, title, content, createdAt});
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.CREATE_POST_SUCCESS));
    return;

})
// 게시글 고유 id값을 가진 게시글을 수정
router.put('/:id', async(req, res)=>{
    const id = req.params.id;
    const post = Post.filter(post => post.postIdx == id);
    if(!id){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
    }
    if(post.length ===0){
        res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.NO_POST));
    }
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.UPDATE_POST_SUCCESS, post[0]));
    return;
})
// 게시글 고유 id값을 가진 게시글을 삭제
router.delete(':id', async(req, res)=>{
    const id = req.params.id;
const post = Post.filter(post => post.postIdx == id);
if(!id){
    res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
}
if(post.length ===0){
    res.status(statusCode.OK)
        .send(util.fail(statusCode.OK, responseMessage.NO_POST));
}
res.status(statusCode.ok)
    .send(util.success(statusCode.OK, responseMessage.DELETE_POST_SUCCESS, post[0]));
return;

})
module.exports = router;