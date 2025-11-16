function calculateTotal(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

// среднее значение
function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return calculateTotal(values) / values.length;
}

// форматирование суммы с символом валюты
function formatCurrency(amount: number, symbol: string): string {
  return `${amount} ${symbol}`;
}

function getTopValues(values: number[], count: number): number[] {
  return [...values].sort((a, b) => b - a).slice(0, count);
}

function printSummary(values: number[]): void {
  const total = calculateTotal(values);
  const average = calculateAverage(values);
  console.log(`Всего записей: ${values.length}`);
  console.log(`Сумма: ${total}`);
  console.log(`Среднее: ${average}`);
}

const sampleData = [100, 500, 1000, 2000, 800];
console.log("1) calculateTotal:", calculateTotal(sampleData));
console.log("2) calculateAverage:", calculateAverage(sampleData));
console.log("3) formatCurrency:", formatCurrency(2500, "₽"));
console.log("4) getTopValues:", getTopValues(sampleData, 3));
console.log("5) printSummary:");
printSummary(sampleData);
