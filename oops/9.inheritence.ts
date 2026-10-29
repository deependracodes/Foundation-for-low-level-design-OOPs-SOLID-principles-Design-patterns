/*
class FullTimeEmployee {
  id: string;
  name: string;
  base_salary: number;

  constructor(id: string, name: string, base_salary: number) {
    this.id = id;
    this.name = name;
    if (base_salary <= 0) {
      throw new Error("base salary cannot be negative");
    }
    this.base_salary = base_salary;
  }

  calculatePay():number{
    return this.base_salary + 5000;
  }
}

class ContractTimeEmployee {
  id: string;
  name: string;
  hourly_rate:number;
  hours_worked:number

  constructor(id: string, name: string, hourly_rate:number,hours_worked: number) {
    this.id = id;
    this.name = name;
    if (hourly_rate <= 0 || hours_worked <= 0) {
      throw new Error("rate and hours cannot be negative");
    }
    this.hourly_rate = hourly_rate;
    this.hours_worked = hours_worked
  }

  calculatePay():number{
    return this.hourly_rate * this.hours_worked
  }
}

Duplication: Properties like id and name, along with validation patterns, are repeated across every employee type.
Inconsistent Interface: If a new feature requires listing all employees by name or id, consumers cannot handle them uniformly because they do not share a common type contract.
*/

abstract class Employee {
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    if (!id || !name) {
      throw new Error("ID and name are required.");
    }
    this.id = id;
    this.name = name;
  }

  // abstract method
  public abstract calculatePay(): number;

  public getInfo(): void {
    console.log(`Employee [ID: ${this.id}, Name: ${this.name}]`);
  }
}

class FullTimeEmployee extends Employee {
  public base_salary:number;

  constructor(id: string, name: string, base_salary: number) {
    super(id, name); // Calls parent constructor to initialize id and name
    if (base_salary < 0) {
      throw new Error("Salary cannot be negative.");
    }
    this.base_salary = base_salary;
  }

  public calculatePay(): number {
      return this.base_salary + 5000
  }
}



class ContractEmployee extends Employee {
  public hourly_rate:number;
  public hours_worked:number;

  constructor(id: string, name: string, hourly_rate: number,hours_worked:number) {
    super(id, name); // Calls parent constructor to initialize id and name
    if (hourly_rate <= 0 || hours_worked <= 0) {
      throw new Error("rate and hours cannot be negative");
    }
    this.hourly_rate = hourly_rate;
    this.hours_worked = hours_worked
  }

  public calculatePay(): number {
      return this.hourly_rate * this.hours_worked
  }
}


// Client code using polymorphism
const employees: Employee[] = [
  new FullTimeEmployee("E001", "Alice", 60000),
  new ContractEmployee("E002", "Bob", 50, 160)
];

for (const emp of employees) {
  console.log(`${emp.getInfo()} - Pay: $${emp.calculatePay()}`);
}



// same example for polymorphism also applies
class Nootification {
    protected recipient: string;

    constructor(recipient: string) {
        this.recipient = recipient;
    }

    send(message: string): void {
        console.log(`Sending notification to ${this.recipient}`);
    }

    log(message: string): void {
        console.log(`Sent: ${message}`);
    }
}

class EmailNotification extends Nootification {
    // mehtod overding
    override send(message: string): void {
        console.log(`Sending email to ${this.recipient}: ${message}`);
    }
}

class SmsNotification extends Nootification {
    override send(message: string): void {
        console.log(`Sending SMS to ${this.recipient}: ${message}`);
    }
}