//1. json object
var sopt = {
    name: 'our sopt',
    slogan: 'we lead our sopt',
    part: ['plan', 'design', 'android', 'server', 'ios'],
    number: 180,
    printName: function(){
        console.log('name : ',this.name)
    },
    printNum: function(){
        console.log('num : ', this.num)
    }
};

console.log('typeof sopt '+ typeof sopt);


console.log('sopt : '+sopt);
console.log('sopt : ', sopt);
console.log('sopt : '+ JSON.stringify(sopt));

sopt.printName();
sopt.number = 200;
sopt.printNum();

//2, json array
var dogs = [
    {name: 'dog1', family: 'family1', age: 1, weight: 1},
    {name: 'dog2', family: 'family2', age: 2, weight: 2},
    {name: 'dog3', family: 'family3', age: 3, weight: 3}
]

console.log('dogs : '+dogs);
console.log('dogs : ', dogs);
console.log('dogs : '+JSON.stringify(dogs));

dogs.forEach(
    dog => console.log(dog.name +'is'+dog.family+' family and age is'+dog.age+'and weight is'+dogs.weight)
);
