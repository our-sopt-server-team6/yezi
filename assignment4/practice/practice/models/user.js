const pool = require('../modules/pool');
const table ='User4';
const crypto = require('crypto');

const user = {
    signup : async(id, name, password, salt, email)=>{
        const fields = 'id, name, password, salt, email';
        const questions = `?,?,?,?,?`;
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if(err.errno == 1062){
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser : async(id)=>{
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            if(result.length ==0){
                return false;
            } else return true;
        } catch(err){
            throw err;
        }
    },
    signin : async(id, password)=>{
        const query = `SELECT  * FROM ${table} WHERE id = "${id}"`;
        try{
            const result = await pool.queryParam(query);
            const hashed = await crypto.pbkdf2(password, result[0].salt, 1, 32, 'sha512').toString('hex');
            if(result[0].password === hashed) {
                return true;
        } else return false;
    } catch (err){
        console.log("login ERROR : ", err);
        throw err;
        }
    },
    getUserById : async (id)=>{
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err){
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    }
}
module.export = user;