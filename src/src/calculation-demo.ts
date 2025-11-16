let income: number = 123500;   // общий доход 
let expenses: number = 82700;  // общий расход
let savings: number = 13000;   // сумма отложить

let netIncome: number = income - expenses;     
let remaining: number = netIncome - savings;   

console.log("Финансовый отчёт:");
console.log(`Доход: ${income} RUB`);
console.log(`Расходы: ${expenses} RUB`);
console.log(`Чистый доход: ${netIncome} RUB`);
console.log(`Сбережения: ${savings} RUB`);
console.log(`Остаток после сбережений: ${remaining} RUB`);
