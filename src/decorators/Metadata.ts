import 'reflect-metadata';

// сохранять произвольные метаданные для свойства
export function Metadata(key: string, value: any) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(key, value, target, propertyKey);
  };
}
