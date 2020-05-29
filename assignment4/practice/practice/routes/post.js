var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let responseMessage = require('../modules/responseMessage');
var moment = require('moment');
// 1. 모든 게시물 조회
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
// 2. 게시글 고유 id 값을 조회
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
    }
    const post = Post.filter(post => post.postIdx == id);
    if(post.length ===0){
        res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.NO_POST));
    }
    const result = Post.getPostById(id);
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, result));
    return;
})
// 3. 게시글 생성
router.post('/', async(req, res)=>{
    const {author, title, content} = req.body;
    if(!author||!title||!content){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    var time = moment();
    var createdAt  = await time.format('yyyy-mm-dd');
    const result = await Post.createPost(author, title, content, createdAt);
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.CREATE_POST_SUCCESS, result));
    return;

})
// 4. 게시글 고유 id값을 가진 게시글을 수정
router.put('/:id', async(req, res)=>{
    const id = req.params.id;
    const {update_author, update_title, update_content} = req.body;
    if(!id){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            return;
    }
    const post = Post.filter(post => post.postIdx == id);
    if(post.length ===0){
        res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.NO_POST));
    }
    var time = moment();
    const createdAt = await time.format('yyyy-mm-dd');
    const result = Post.updatePostById(id,  update_author,update_title,update_content, createdAt);
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.UPDATE_POST_SUCCESS, result));
    return;
})
// 5. 게시글 고유 id값을 가진 게시글을 삭제
router.delete(':id', async(req, res)=>{
    const id = req.params.id;
    if(!id){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        return;
    }
    const post = Post.filter(post => post.postIdx == id);
    if(post.length ===0){
        res.status(statusCode.OK)
            .send(util.fail(statusCode.OK, responseMessage.NO_POST));
    }
    const result = Post.deletePostById(id);
    res.status(statusCode.ok)
        .send(util.success(statusCode.OK, responseMessage.DELETE_POST_SUCCESS, result));
    return;
})
module.exports = router;