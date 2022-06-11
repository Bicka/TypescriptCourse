function Logger(logString: string) {
  return function (funct: Function) {
    console.log(logString)
    console.log(funct)
  }
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originatConstructor: T,
  ) {
    return class extends originatConstructor {
      constructor(..._: any[]) {
        super()
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template + this.name
        }
      }
    }
  }
}

@Logger('Log this')
@WithTemplate('test', 'p-id')
class Person2 {
  name = 'Max'

  constructor(..._: any[]) {
    console.log('crreating')
  }
}

const pers = new Person2()
console.log(pers)

function LogProperty(target: any, propertyName: string) {
  console.log(`Property decorator`)
  console.log(target, propertyName)
}
function LogAccesor(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log(`Accesor decorator`)
  console.log(target, name, descriptor)
}
function LogFunction(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor,
) {
  console.log(`Property decorator`)
  console.log(target, name, descriptor)
}

function LogParrameter(target: any, name: string | Symbol, position: number) {
  console.log(`Parameter decorator`)
  console.log(target, name, position)
}
class Product {
  @LogProperty
  title: string

  @LogAccesor
  set price(val: number) {
    if (val > 0) this._price = val
    else throw new Error('< 0')
  }

  constructor(t: string, private _price: number) {
    this.title = t
  }

  @LogFunction
  getPriceWithTax(@LogParrameter tax: number) {
    if (tax <= 1 && tax >= 0) return this._price * (1 + tax)
    else throw new Error('< 0')
  }
}

const prod = new Product('Test', 153)

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMehod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMehod.bind(this)
      return boundFn
    },
  }
  return adjDescriptor
}

class Printer {
  message = 'Works'

  @Autobind
  showmessage() {
    console.log(this.message)
  }
}
const printer = new Printer()
const btn = document.querySelector('button')!
btn.addEventListener('click', printer.showmessage)

interface ValidationConfig {
  [property: string]: {
    [validateblaProp: string]: string[]
  }
}

const registredValidators: ValidationConfig = {}

function RequiredValue(target: any, name: string) {
  registredValidators[target.constructor.name] = {
    ...registredValidators[target.constructor.name],
    [name]: [...(registredValidators[target.constructor.name]?.[name] ?? []), 'required'],
  }
}

function PositiveNumber(target: any, name: string) {
  registredValidators[target.constructor.name] = {
    ...registredValidators[target.constructor.name],
    [name]: [...(registredValidators[target.constructor.name]?.[name] ?? []), 'positive'],

  }
}

function validate(obj: any) {
  const objValidatorConfig = registredValidators[obj.constructor.name]
  if (!objValidatorConfig) return true
  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
          break
        case 'positive':
          isValid = isValid && obj[prop] > 0
          break
      }
    }
  }
  return isValid;
}

class Course {
  @RequiredValue
  tittle: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.tittle = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)
  if (!validate(createdCourse)) {
    alert('Invalid')
    return
  }
  console.log(createdCourse)
})
