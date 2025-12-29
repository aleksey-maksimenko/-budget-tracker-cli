// запретить изменение свойства после инициализации
export function ReadOnly(target: any, propertyKey: string) {
  const valueKey = `__${propertyKey}`;
  Object.defineProperty(target, propertyKey, {
    get() {
      return this[valueKey];
    },
    set(newValue) {
      if (this[valueKey] !== undefined) {
        console.warn(`Свойство ${propertyKey} доступно только для чтения`);
      } else {
        this[valueKey] = newValue;
      }
    },
    enumerable: true,
    configurable: false,
  });
}
