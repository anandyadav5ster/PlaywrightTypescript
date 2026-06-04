var Student = /** @class */ (function () {
    function Student(name, age) {
        this.name = name;
        this.age = age;
    }
    Student.prototype.greet = function () {
        console.log("Student name is ".concat(this.name, " and age is ").concat(this.age));
    };
    return Student;
}());
var student = new Student('James', 32);
console.log(student.name);
console.log(student['age']);
student.greet();
