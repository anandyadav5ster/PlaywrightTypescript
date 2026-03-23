// interface define the shape of the object and extends and merge.
interface Cars {
    model : number,
    name: string
}

const myCar: Cars ={
    model: 7777,
    name: "BMW",
    price: 20000
}

console.log(myCar.name);

interface Cars {
    price: number
}
console.log(`Price of the car model ${myCar.name}${myCar.model} is ${myCar.price} Dollars`)
