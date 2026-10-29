/*

class NotificationService {
  public sendNotification(type: "email" | "sms" | "push", recipient: string, message: string): void {
    if (type === "email") {
      // Low-level email logic leaking into business logic
      console.log(`Connecting to SMTP server at smtp.mailprovider.com...`);
      console.log(`Formatting HTML headers and body for email...`);
      console.log(`Sending email to ${recipient}: ${message}`);
    } else if (type === "sms") {
      // Low-level SMS gateway logic leaking into business logic
      console.log(`Connecting to Twilio Gateway API...`);
      console.log(`Checking character limits (160 chars)...`);
      console.log(`Sending SMS to ${recipient}: ${message}`);
    } else if (type === "push") {
      // Low-level FCM/APNS logic leaking into business logic
      console.log(`Authenticating with Firebase Cloud Messaging...`);
      console.log(`Constructing APNS payload JSON...`);
      console.log(`Pushing notification to device token ${recipient}: ${message}`);
    } else {
      throw new Error("Unknown notification type");
    }
  }
}

// Client code is forced to know about internal channel strings and types
const service = new NotificationService();
service.sendNotification("email", "user@example.com", "System alert!");

*/

abstract class NotificationSender {
  // abstract method
  protected abstract sendMessage(recipient: string, message: string): void;

  // Template method : Defines high level workflow
  public send(recipient: string, message: string): void {
    if (!recipient || !message) {
      throw new Error("Recipient and message cannot be empty");
    }

    // delegate speciic workflow
    this.sendMessage(recipient, message);
  }
}

// concrete implementation 1
class EmailNotificationSender extends NotificationSender {
  protected sendMessage(recipient: string, message: string): void {
    console.log(
      `[SMTP] Connecting to mail server & sending HTML email to ${recipient}`,
    );
    console.log(`Content: ${message}`);
  }
}

// concrete implementation 2
class SmsNotificationSender extends NotificationSender {
  protected sendMessage(recipient: string, message: string): void {
    console.log(`[Twilio] Packaging payload for SMS gateway to ${recipient}`);
    console.log(`Content: ${message}`);
  }
}

// client code depends only on abstraction NotificationSender

function alert(sender: NotificationSender, recipient: string, message: string) {
  sender.send(recipient, message);
}

// usage
const emailNotification: NotificationSender = new EmailNotificationSender();

alert(emailNotification, "admin@example.com", "Server CPU utilization at 95%");

const smsNotification: NotificationSender = new SmsNotificationSender();
alert(smsNotification, "+919029299231", "Your order is out for delivery");
