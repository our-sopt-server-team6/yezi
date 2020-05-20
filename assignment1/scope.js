function funcScope(){
    var v1 = 123;
    if(true){
        var v2 = 123;
        let ll = 'abc';
        console.log('let block scope, ll : ', ll);
    }
    console.log('var function scope , v2 : ', v2);
}

funcScope();