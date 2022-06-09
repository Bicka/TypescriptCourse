const add = (...numbers:number[]) =>
{
    return numbers.reduce((result,val) => result + val)
}

console.log(add(5,4,3,2,1));