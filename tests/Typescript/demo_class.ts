class Student {

    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Student name is ${this.name} and age is ${this.age}`)
    }
}

const student = new Student('James', 32);
console.log(student.name);
console.log(student['age'])
student.greet();