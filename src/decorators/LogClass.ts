// логировать создание экземпляра класса и его аргументы
export function LogClass<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Создан экземпляр класса ${constructor.name} с аргументами:`, args);
    }
  };
}
