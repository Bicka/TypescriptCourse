type Admin = {
    name: string;
    privilages: string[];
}

type Emplayee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Emplayee;


const e1: ElevatedEmployee = {
    name : 'Max',
    privilages : ['create'],
    startDate: new Date()
}


interface Bird {
    type: 'bird';
    flyingSpeed: number;
}
interface Horse{
    type: 'horse'
    groundSpeed: number;
}

type Animal = Bird | Horse;

function move(a: Animal)
{
    let speed : number;
    switch(a.type)
    {
        case 'bird':
            speed = a.flyingSpeed;
            break;
        case 'horse':
            speed = a.groundSpeed;
            break;
    }
    console.log(speed);
}

const par = <HTMLParagraphElement>document.getElementById('p-id');
const userInput = document.getElementById('p-id') as HTMLInputElement;

interface ErrorContainer {
    [prop: string] : string;
}

const errorBag: ErrorContainer = {
    email: 'Not a validemail',
    username: 'Marcel'
}

const user = '';
const data = user ?? 'defoult';
