// class
class Employee {
  // state/properties
  name: string;
  phone: string;

  // constructor
  constructor(name: string, phone: string) {
    // validation
    if (phone.length != 10) {
      throw new Error("Phone no should be 10 digits");
    }
    ((this.name = name), (this.phone = phone));
  }

  // mehtods/functions
  greet(): void {
    console.log(`Hi i am ${this.name} and this is my phone no : ${this.phone}`);
  }
}

// actual object 1
const emp_1 = new Employee("Alice", "9999999999");
console.log(emp_1);
emp_1.greet();

// actual object 2  
const emp_2 = new Employee("David", "1234");
console.log(emp_2); // validation error
