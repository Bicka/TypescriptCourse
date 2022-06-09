class Department {
    name: string;
    employees: string[] = []
    constructor(name: string) {
        this.name = name;
    }

    describe(this: Department){
        console.log(`Dep: ${this.name}`)
    }
    addEmplyee(employee: string){
        this.employees.push(employee);
    }
    printEmplyeeInfo(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const d1 = new Department('D1');
d1.addEmplyee('E1');
d1.describe();

const d2 = {...d1, describe: d1.describe};


d2.name = 'D2';

















const add = (...numbers:number[]) =>
{
    return numbers.reduce((result,val) => result + val)
}

console.log(add(5,4,3,2,1));
