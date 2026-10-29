// Independent entity
class Product {
  constructor(public readonly productId: string, public readonly name: string, public readonly price: number) {}
}

// Service used via Dependency
class PaymentGateway {
  public charge(amount: number): boolean {
    console.log(`Charging amount: $${amount}`);
    return true;
  }
}

// Component part owned via Composition
class OrderItem {
  constructor(
    public readonly product: Product, // Association to Product
    public readonly quantity: number
  ) {}

  public getTotalPrice(): number {
    return this.product.price * this.quantity;
  }
}

// Whole object managing Composition of OrderItems
class Order {
  // Composition: OrderItems are created and owned exclusively by this Order
  private items: OrderItem[] = [];

  constructor(public readonly orderId: string) {}

  public addProduct(product: Product, quantity: number): void {
    const item = new OrderItem(product, quantity);
    this.items.push(item);
  }

  public calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }

  // Dependency: PaymentGateway is passed into the behavior method
  public checkout(paymentGateway: PaymentGateway): boolean {
    const total = this.calculateTotal();
    return paymentGateway.charge(total);
  }
}

// Usage
const productA = new Product("P001", "Mechanical Keyboard", 120);
const order = new Order("ORD-1001");

// Composition in action: adding items to the order
order.addProduct(productA, 2);

// Dependency in action: injecting payment service at runtime
const gateway = new PaymentGateway();
order.checkout(gateway);