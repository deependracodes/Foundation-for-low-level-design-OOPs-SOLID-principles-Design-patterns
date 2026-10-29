class UserAccount {
  public readonly userId: string;
  public readonly createdAt: Date;
  private email: string;
  private isActive: boolean = false;

  constructor(userId: string, email: string) {
    this.userId = userId;
    this.createdAt = new Date();
    this.email = email;
  }

  public getEmail(): string {
    return this.email;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public activateAccount(): void {
    this.isActive = true;
    this.logChange("Account activated");
  }

  public deactivateAccount(): void {
    this.isActive = false;
    this.logChange("Account deactivated");
  }

  public updateEmail(newEmail: string): void {
    if (this.isValidEmail(newEmail)) {
      this.email = newEmail;
      this.logChange("Email updated");
    }
  }

  protected logChange(action: string): void {
    console.log(`Log: ${action}`);
  }

  private isValidEmail(email: string): boolean {
    return email.includes("@");
  }
}

/*

Here,

- userId and createdAt are readonly because they represent immutable identity and creation metadata established at instantiation and must never change.

- email and isActive are private to enforce encapsulation, preventing direct external mutation and ensuring state transitions go through strict business validation methods.

- getEmail, getIsActive, activateAccount, deactivateAccount, and updateEmail are public because other parts of the application need to interact with the account lifecycle.

- logChange is protected, which means a child class (such as a PremiumUserAccount) could reuse or customize the audit logging behavior.

- isValidEmail is private because it is an internal implementation detail used solely for validation logic within this class.

*/