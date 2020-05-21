const crypto = require('crypto');
const fs = require('fs');

const encrypt =  (salt, password)=>{
    return new Promise((res, rej)=>{
    crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, deriveKey)=>{
        if(err) throw err;
        const hashed = deriveKey.toString('hex');
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);
        res(hashed);
    });
});
}
fs.readFile(`${__dirname}/password.txt`, async (err, data)=>{
    if(err) throw err;
    console.log('data : ', data);
    const password = data.toString();
    const salt = crypto.randomBytes(32).toString('hex');
    const hashed =  await encrypt(salt, password);

    fs.writeFile(`${__dirname}/hashed.txt`, hashed, (err)=>{
        if(err) throw err;
        console.log('hashed : ', hashed);
    });
});