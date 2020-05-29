const pool = require('../modules/pool');
const table ='post';

const post = {
    // 1. 모든 게시물 조회
    getPost : async(author, title, content, createdAt)=>{
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch (err){
            console.log('getPost ERROR : ', err);
            throw err;
        }
    },
    // 2. 게시글 고유 id 값을 조회
    getPostById : async(id)=>{
        const query = `SELECT * FROM ${table} WHERE postIdx = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('getPostById ERROR : ', err);
            throw err;
        }
    },
    // 3. 게시글 생성
    createPost : async(author, title, content)=>{
        const fields = `author, title, content`;
        const questions = `?.?.?.?`;
        const values = [author, title, content];
        const query = `INSERT INTO  ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err){
            if(err.errno == 1062){
                console.log('createPost error : ', err.errno, err.code);
                return -1;
            }
            console.log('createPost ERROR : ', err);
            throw err;
        }
    },
    // 4. 게시글 고유 id값을 가진 게시글을 수정
    updatePostById: async(id, author, title, content, createdAt)=>{
        const query = `UPDATE * FROM ${table} set author = "${author}",title ="${title}",content = "${content}", createdAt = "${createdAt}"  WHERE postIdx = "${id}"`;
        try{
            const result = pool.queryParam(query);
        } catch(err){
            console.log("updatePostById ERROR : ", err);
            throw err;
        }
    },
    // 5. 게시글 고유 id값을 가진 게시글을 삭제
    deletePostById : async(id)=>{
        const query = `DELETE * FROM ${table} WHERE postIdx = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('deletePostById ERROR : ', err);
            throw err;
        }
    }

    }
    module.exports = post;

