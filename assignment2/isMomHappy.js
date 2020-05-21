let isMomHappy = false;
let phone = {
    brand: 'Samsung',
    color: 'red'
};

var willGetNewPhone = new Promise((resolve, reject)=>{
    if (isMomHappy){
        resolve(console.log(phone));
    }
    else{
        var text= new Error('mom is not happy');
        reject(console.log(text));
    }
})