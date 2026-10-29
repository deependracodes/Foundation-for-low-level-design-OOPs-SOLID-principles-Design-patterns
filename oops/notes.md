# What is Object Oriented Programing ?
  - It is way of organizing sotware around objects
  - Object contains 2 main things
    * STATE : the data it stores
    * BEHAVIOUR : the action it performs 
  - A complete application is built from many objects working together , with each handling a specific part of the system

Ex : An Order object might store items items,status etc
     and also might provide methods like addItem, removeItem,calculateTotal etc

# What is a class ?
  - Class is blueprint to create a object
  - It defines the data an object stores and the actions/methods it can perform on it

# What is a object ?
  - Object is an instance of a class 
  - It is the actual thing created from the blueprint

# What is a constructor ?
  - Setting every field manually while creating an object can become repetetive and may also lead to creating incomplete objects
  - A constructor is a special method that runs when an object is created
  - [Funtinalities]
    * intialize the object with the required data 
    * Ensure that object starts with a valid state, as we can also add validation inside the constructor to prevent invalid data

# What is enum ?
  - Sometimes a field should accept only a value from some predefined set of values
  - Enum is a set of some constant values
  
# What are access modifiers
  - We also need to control which part of a class should be visible from outside
  - Access modifiers control where a class , field , constructor or method can be accessed.

# Types of access modifiers in typescript
  * public - defualt , accessed anywhere inside a application
  * private - accessed only within the same class
[NOTE] : This restriction is strictly enforced by the TypeScript compiler at compile-time. Once compiled to JavaScript, it becomes publicly accessible unless using ECMAScript private fields (#).
  * protected - accessed withhin a class defining it and any subclasses that inherit from it
  * readonly - Prevents a property from being reassigned after the object is constructed (either in the declaration or inside the constructor)

# What is a interface
  - An interace defines a contract . It tells us what a class must do without deciding extacly how it should do it
  - Defines the shape and signature an object, class, or function must adhere to. It specifies property names, types, method signatures, and optional members without providing any implementation details or state.

# Difference b/w interface and type alias
  - Both can describe object shapes. However, interfaces support declaration merging (if you declare the same interface multiple times, TypeScript merges them automatically), whereas type aliases do not.

  - Interfaces are generally preferred for object and class contracts because they offer better compiler performance and clearer error messages.

  - Interfaces can contain optional properties (email?: string) and read-only properties (readonly id: string), giving you precise control over object shapes.

  - When dealing with dynamic property keys (such as dictionaries or configuration maps), interfaces can define index signatures: [key: string]: any

# What is abstract class 
  - Interfaces work well when d/f classes need to follow same contract, but sometimes , related classes also need to share common code or state
  - An Abstact class is a class that cannot be instantiated directly.
    It can provided shared fields and methods while leaving some behaviour for child classes to implement

# What are the 4 pillars of oops
  - Encapsulation
  - Abstaction
  - Inheritance
  - Polymorphism

# What is Encapsulation
  - It means keeping the data and methods that operate on the data , together inside a class , while controlling how that data can be accessed or modified from outside
  - encapsulation is enforced using access modifiers 
  - commonly known as information hiding.

# What is Abstraction
  - It means hiding complex implementation details and exposing only the essential features and behavior of an object or system
  - abstraction is implemented using abstract classes and interfaces, alongside access control modifiers to hide internal subsystems
  - commonly known as implementation hiding

# what is inheritance
  - Inheritance allows one class to reuse and extend the fields and behavior of another class
  - It represents an is-a relationship
  - For example, an email notification is a type of notification, and an SMS notification is also a type of notification.
  - inheritance is implemented using the extends keyword and the super keyword to invoke parent constructors or methods

- Method Overriding
  - Method overriding happens when a child class provides a new implementation of a method inherited from its parent. The method name and parameters remain the same, but the behavior changes.

Note : If you modify the internal implementation or state of a parent class, it can unintentionally break subclasses across the codebase. Inheritance creates deep structural coupling.

prefer composition (has-a relationship) over inheritance (is-a relationship) when behavior changes frequently or when you want to avoid rigid hierarchies.

# Polymorphism
  - Polymorphism, meaning "many forms", is the ability of different classes to respond to the same message or method call in unique ways
  - It allows objects of distinct types to be treated through a uniform interface, enabling dynamic method dispatch at runtime.
  - polymorphism is typically achieved through subtype polymorphism (implementing an interface or extending an abstract class) or method overriding.

# Class Relationships
  - It describe how these objects are connected and interact with one another
  - Determines the degree of coupling between components, which directly impacts maintainability, testability, and flexibility.

# what are the 4 important relationships
  - Association
  - Aggregation
  - Composition
  - Dependency

# Association (Has-A relation)
  - Means that one class is connected to another 
  - One class holds a reference to another as an instance property
  - It can both unidirectional or bidirectional
  - Ex : An Order can be associated with a Customer

  # Types of associations
    - One-to-One - a user has a profile
    - One-to-Many - a user can have many orders
    - Many-to-One - many students learn from one teacher
    - Many-to-Many - one sudent can join many courses and each course can contain many students
  
# Aggrgation (special type of Has-A relation)
  - a special type of association that represents a has-a relationship with weak ownership
  - One object contains or groups other objects, but those objects can still exist independently.
  - Ex :An engineering team has developers, but it does not fully own them.If the team is removed, the developers still exist.They can move to another team or remain without one.

# Composition (strict Has-A/Owns-A relation)
  - A stricter has-a association relationship representing strong ownership
  - The child object is an important part of the parent and usually does not exist independently from it
  Ex: An Order can contain multiple OrderItems.Each order item belongs to a specific order and does not have much meaning without it.

# Aggregation vs Composition
  - Ownsership : Weak | strong
  - child lifecycle : Independent | Dependent
  ex: A team of developers | An order with its items

# Dependency (Uses-A relation)
  - A transient relationship where one class uses another class temporarily, usually as a method parameter, local variable, or return type.
  - Ex: An OrderService may depend on an inventory service or payment service etc

*** Example for each topic are the ts files ***