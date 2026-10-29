// class
class User {
  // state/properties
  name: string = "";
  age: number = 0;

  // mehtods/functions
  greet(): void {
    console.log(`Hi i am ${this.name} and i am ${this.age} years old`);
  }
}

// actual object 1
const user_1 = new User();
user_1.name = "Alex";
user_1.age = 20;
console.log(user_1);
user_1.greet();

// actual object 2
const user_2 = new User();
user_2.name = "Danny";
user_2.age = 24;
console.log(user_2);
user_2.greet();
