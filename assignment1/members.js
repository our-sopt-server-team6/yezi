
var member = [
    {name: '김해리', nickName: 'haeRi',age: 25 ,sopt: 'ob'},
    {name: '이지윤', nickName: 'JiYoon',age:23 ,sopt: 'yb'},
    {name: '임형준', nickName: 'hyungJoon',age:29 ,sopt: 'yb'},
    {name: '김정욱', nickName: 'jungUk',age: 25 ,sopt:'yb'}
]

member.forEach(
    item => console.log('name : '+ item.name, ' nickName : '+ item.nickName+' age : '+item.age+' sopt : '+item.sopt)
)