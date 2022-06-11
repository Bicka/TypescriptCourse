class Department {
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Dep: ${this.id} - ${this.name}`);
  }
  addEmplyee(employee: string) {
    this.employees.push(employee);
  }
  printEmplyeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ItDep extends Department{
    constructor(id: string, public admins: string[])
    {
        super(id, 'IT');
    }
}

const d1 = new Department("1", "D1");
d1.addEmplyee("E1");
d1.describe();

const d2 = new ItDep('2',['dd','dd2']);



const add = (...numbers: number[]) => {
  return numbers.reduce((result, val) => result + val);
};

console.log(add(5, 4, 3, 2, 1));
