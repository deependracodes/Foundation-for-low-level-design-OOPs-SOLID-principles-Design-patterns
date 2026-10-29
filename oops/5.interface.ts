// Define contract
interface IPaymentGateway {
  processPayment(amount: number): boolean;
}

// concrete implementation 1
class StripeGateway implements IPaymentGateway {
  processPayment(amount: number): boolean {
    console.log("processing payment through stripe api");
    return true;
  }
}

// concrete implementation 2
class PayPalGatewat implements IPaymentGateway {
  processPayment(amount: number): boolean {
    console.log("processing payment through paypal api");
    return true;
  }
}

// high-level module depends only on interface
class CheckoutService {
  constructor(private paymentGateway: IPaymentGateway) {}

  public completePurchase(amount: number): void {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }

    const success: boolean = this.paymentGateway.processPayment(amount);

    if (!success) {
      throw new Error("Payment failed");
    }

    console.log("Order purchased successfully");
  }
}

// usage
const stripeGateway: IPaymentGateway = new StripeGateway();
const checkOut_using_stripe = new CheckoutService(stripeGateway);
checkOut_using_stripe.completePurchase(200);

const paypalGateway: IPaymentGateway = new PayPalGatewat();
const checkOut_using_paypal = new CheckoutService(paypalGateway);
checkOut_using_paypal.completePurchase(250);


/*

import express, { Request, Response, Router } from "express";

// 1. Interface Contract
interface IPaymentGateway {
  processPayment(amount: number): boolean;
}

// 2. Concrete Implementations
class StripeGateway implements IPaymentGateway {
  public processPayment(amount: number): boolean {
    console.log(`[Stripe API] Charging $${amount}`);
    // Real integration logic with Stripe SDK goes here
    return true;
  }
}

class PayPalGateway implements IPaymentGateway {
  public processPayment(amount: number): boolean {
    console.log(`[PayPal SDK] Charging $${amount}`);
    // Real integration logic with PayPal SDK goes here
    return true;
  }
}

// 3. Factory Pattern: Resolves the correct gateway implementation dynamically
class PaymentGatewayFactory {
  public static create(provider: string): IPaymentGateway {
    switch (provider.toLowerCase()) {
      case "stripe":
        return new StripeGateway();
      case "paypal":
        return new PayPalGateway();
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  }
}

// 4. Business Service Layer (Depending purely on the interface)
class CheckoutService {
  public constructor(private paymentGateway: IPaymentGateway) {}

  public executeCheckout(amount: number): void {
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero.");
    }

    const success = this.paymentGateway.processPayment(amount);
    if (!success) {
      throw new Error("Payment gateway declined transaction.");
    }
  }
}

// 5. Express Controller & Route Setup
const router: Router = express.Router();

router.post("/checkout", (req: Request, res: Response) => {
  try {
    const { amount, provider } = req.body;

    // Validation edge case: Ensure required fields exist
    if (!amount || !provider) {
      return res.status(400).json({ error: "Missing amount or provider" });
    }

    // Resolve the gateway dynamically using the Factory pattern
    const gateway: IPaymentGateway = PaymentGatewayFactory.create(provider);

    // Inject the resolved gateway into the service layer
    const checkoutService = new CheckoutService(gateway);
    checkoutService.executeCheckout(Number(amount));

    return res.status(200).json({ 
      success: true, 
      message: `Successfully processed $${amount} via ${provider}` 
    });

  } catch (error: any) {
    return res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// App initialization
const app = express();
app.use(express.json());
app.use("/api", router);

app.listen(3000, () => console.log("Server running on port 3000"));

*/