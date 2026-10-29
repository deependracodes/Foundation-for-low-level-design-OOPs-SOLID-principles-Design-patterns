// Bad

/*
class BankAccount {
  // Public properties allow direct external mutation
  public balance: number;
  public owner: string;

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
  }
}

// Client code abusing direct access
const account = new BankAccount("Alice", 1000);

// Edge case / bug: External code can set a negative balance directly
account.balance = -5000; 

// Edge case / bug: External code can corrupt data types or logic
account.balance = "invalid_balance"; 

console.log(account.balance); // -5000 (Business rule violated!)


class Animal {
  constructor(public name: string) {}
}

class Zoo {
  private animals: Animal[] = [];

  public addAnimal(animal: Animal): void {
    this.animals.push(animal);
  }

  // BAD: Returning the direct reference to the internal array
  public getAnimals(): Animal[] {
    return this.animals;
  }
}

const zoo = new Zoo();
zoo.addAnimal(new Animal("Lion"));
zoo.addAnimal(new Animal("Tiger"));

// External code gets the reference
const leakedAnimals = zoo.getAnimals();

// External code mutates the internal state directly, bypassing Zoo class control!
leakedAnimals.pop(); 
leakedAnimals.push(new Animal("Unauthorized Alien"));

// The Zoo's internal state is now corrupted
// console.log(zoo.getAnimals()); -> Contains "Unauthorized Alien", Lion is gone!
*/

// Good
class BankAccount {
  // Internal state is hidden from the outside world
  #balance: number;
  private readonly owner: string;

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }
    this.#balance = initialBalance;
  }

  // Controlled read-only access via a getter
  public get balance(): number {
    return this.#balance;
  }

  // Controlled mutation via domain-driven methods enforcing business rules
  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be greater than zero.");
    }
    this.#balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be greater than zero.");
    }
    if (amount > this.#balance) {
      throw new Error("Insufficient funds.");
    }
    this.#balance -= amount;
  }
}

// Client code using the encapsulated class
const account = new BankAccount("Alice", 1000);

// account.#balance = 500;  // (Private property is not accessible outside class)

try {
  account.withdraw(1500); // Throws Error: Insufficient funds.
} catch (e: any) {
  console.log(e.message);
}

account.deposit(500);
console.log(account.balance); // 1500 (Invariant preserved!)

class Animal {
  constructor(public name: string) {}
}

class Zoo {
  private animals: Animal[] = [];
  private readonly maxCapacity: number = 100;

  public addAnimal(animal: Animal): void {
    if (this.animals.length >= this.maxCapacity) {
      throw new Error("Zoo is at full capacity.");
    }
    this.animals.push(animal);
  }

  // GOOD: Return a shallow copy of the array using the spread operator
  public getAnimals(): Animal[] {
    return [...this.animals];
  }

  // Alternatively, return a readonly array type if you want to prevent mutation at compile time
  public getAnimalsReadonly(): readonly Animal[] {
    return this.animals; // TypeScript compiler blocks mutation methods (.push, .pop) on readonly arrays
  }
}

const zoo = new Zoo();
zoo.addAnimal(new Animal("Lion"));
zoo.addAnimal(new Animal("Tiger"));

// Safe: Attempting to mutate the returned array only affects the copy, not internal state
const safeAnimals = zoo.getAnimals();
safeAnimals.pop(); 

// Internal state remains completely intact and protected
console.log(zoo.getAnimals().length); // 2 (Lion and Tiger are still safe)