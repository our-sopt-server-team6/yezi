var server1 = ["a", "b", 23, null, true];
var server2 = Array("c", "d", 13);
var server3 = new Array("e", "f", false, undefined);

console.log("server1 : ", server1);
console.log("server2 : ", server2);
console.log("server3 : ", server3);

server1.push(123);
server2[server2.length] = "what";
server3[99] = "server3's length";

console.log("server1 : ", server1);
console.log("server2 : ", server2);
console.log("server3 : ", server3);


let str1= 'in server1~';
for (var item of server1){
    str1 += item + ',';
}
str1 +='"이 들어있네요~';
console.log(str1);

let str2 = 'server2에는 "';
for(var item of server2){
    str2 += server2[item] + ',';
}
str2 = '"이 들어있네요 ';
console.log(str2);

let str3 = 'server3에는~ "';
server3.forEach(item => str3 += item+',');
str3 +='"이 들어있네요';
console.log(str3);