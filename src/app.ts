//const names = ['Max', 'Marcel'];
//
//const promise : Promise<string> = new Promise((resolve, reject) => {
//    setTimeout(() =>{
//        resolve('This is done!');
//    },200);
//});
//
//promise.then(data => {
//    console.log(data.split(' '));
//});

function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "M" }, { age: 25 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDesc<T extends Lengthy>(element: T): [T, string] {
  let desc = "No value";
  if (element.length > 0) {
    desc = `${element.length} elements`;
  }
  return [element, desc];
}

console.log(countAndDesc("blaa"));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
}

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourse(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  let course: Partial<CourseGoal> = {};
  course.title = title;
  course.description = description;
  course.completeUntil = completeUntil;

  return course as CourseGoal;
}
