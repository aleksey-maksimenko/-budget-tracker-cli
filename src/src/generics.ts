export interface Identifiable {
  id: number;
}

export interface Describable {
  describe(): string;
}

// универсальное хранилище id-объектов
export class GenericStorage<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  removeById(id: number): boolean {
    const index = this.items.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
  getById(id: number): T | undefined {
    return this.items.find((i) => i.id === id);
  }
  getAll(): T[] {
    return [...this.items];
  }
  describeAll(): void {
    for (const item of this.items) {
      // есть ли метод describe
      if (typeof (item as any).describe === "function") {
        console.log((item as any).describe());
      } else {
        console.log(`Элемент id: ${item.id} не содержит описания`);
      }
    }
  }
}

export class Product implements Identifiable, Describable {
  constructor(
    public id: number,
    public name: string,
    public price: number
  ) {}
  describe(): string {
    return `Product #${this.id}: ${this.name}, price: $${this.price}`;
  }
}

const storage = new GenericStorage<Product>();
storage.add(new Product(1, "Ноутбук Ternovo X540J", 2699));
storage.add(new Product(2, "Смартфон XPhone 128 GB", 1100));
storage.add(new Product(3, "Наушники Earbudzz '98", 549));

console.log("\n     Описание товаров");
storage.describeAll();

// объект без метода describe
const lastItem = {
  id: 999,
  name: "Noname item",
  price: 0
} as Product;
storage.add(lastItem);

console.log("\n     Проверка элемента без describe()");
storage.describeAll();
