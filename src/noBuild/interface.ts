interface IPerson {
  readonly name: string;
  age: number;

  greet(phrase: string): void;
}

class Person implements IPerson {
  constructor(public readonly name: string, public age: number) {}
  greet(phrase: string) {
    console.log(`${phrase}, I am ${this.name}`);
  }
}

let user1: IPerson;

user1 = new Person("Max", 25);

user1.greet("Hi");

