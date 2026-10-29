// Common contract for all renderable shapes
interface Shape {
  render(): void;
  calculateArea(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {
    if (radius <= 0) throw new Error("Radius must be positive.");
  }

  public render(): void {
    console.log(`Rendering Circle with radius ${this.radius}`);
  }

  public calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Square implements Shape {
  constructor(private side: number) {
    if (side <= 0) throw new Error("Side must be positive.");
  }

  public render(): void {
    console.log(`Rendering Square with side ${this.side}`);
  }

  public calculateArea(): number {
    return this.side ** 2;
  }
}

// Renderer is closed for modification, open for extension
class SceneRenderer {
  public renderScene(shapes: Shape[]): void {
    for (const shape of shapes) {
      shape.render();
      console.log(`Area: ${shape.calculateArea().toFixed(2)}`);
    }
  }
}

// Client usage
const shapes: Shape[] = [
  new Circle(5),
  new Square(4)
];

const sceneRenderer = new SceneRenderer();
sceneRenderer.renderScene(shapes);