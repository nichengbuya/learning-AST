const test = '2[3[ad]2[bz]1[c]]';
const test2 = '22[abc]'
function smartRepeat(str:string){
    let numStack:any = [];
    let strStack:any = [];
    let i = 0;
    while(i < str.length-1){
        const rest = str.substring(i);
        if(/^\d+\[/.test(rest) ){
            const num = (rest.match(/^(\d+)\[/) as any)[1];
            numStack.push(Number(num));
            strStack.push('')
            i += num.length+1;
        }else if(/^\w+\]/.test(rest)){
            const word = (rest.match(/^(\w+)\]/) as any)[1];
            strStack[strStack.length-1] = word;
            i += word.length
        }else if(rest[0] === ']'){

            const times = numStack.pop();
            const word = strStack.pop();
            strStack[strStack.length-1] += word.repeat(times);
            i++;
        }
    }

    return strStack[0].repeat(numStack[0])
}
console.log(smartRepeat(test));