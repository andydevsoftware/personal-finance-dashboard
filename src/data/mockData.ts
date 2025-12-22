// Datos simulados para el dashboard de finanzas

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
  icon: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface RecurringExpense {
  name: string;
  amount: number;
  icon: string;
}

export const transactions: Transaction[] = [
  // Ingresos
  {
    id: "1",
    description: "Salario",
    amount: 3500,
    category: "Salario",
    date: "2024-12-01",
    type: "income",
  },
  {
    id: "2",
    description: "Freelance",
    amount: 800,
    category: "Extra",
    date: "2024-12-10",
    type: "income",
  },

  // Gastos - Alimentación
  {
    id: "3",
    description: "Supermercado",
    amount: 450,
    category: "Alimentación",
    date: "2024-12-05",
    type: "expense",
  },
  {
    id: "4",
    description: "Restaurante",
    amount: 85,
    category: "Alimentación",
    date: "2024-12-08",
    type: "expense",
  },
  {
    id: "5",
    description: "Delivery",
    amount: 120,
    category: "Alimentación",
    date: "2024-12-12",
    type: "expense",
  },
  {
    id: "6",
    description: "Café",
    amount: 45,
    category: "Alimentación",
    date: "2024-12-15",
    type: "expense",
  },

  // Gastos - Transporte
  {
    id: "7",
    description: "Uber",
    amount: 95,
    category: "Transporte",
    date: "2024-12-03",
    type: "expense",
  },
  {
    id: "8",
    description: "Gasolina",
    amount: 180,
    category: "Transporte",
    date: "2024-12-07",
    type: "expense",
  },
  {
    id: "9",
    description: "Taxi",
    amount: 35,
    category: "Transporte",
    date: "2024-12-14",
    type: "expense",
  },

  // Gastos - Vivienda
  {
    id: "10",
    description: "Alquiler",
    amount: 900,
    category: "Vivienda",
    date: "2024-12-01",
    type: "expense",
  },
  {
    id: "11",
    description: "Luz",
    amount: 85,
    category: "Vivienda",
    date: "2024-12-05",
    type: "expense",
  },
  {
    id: "12",
    description: "Agua",
    amount: 45,
    category: "Vivienda",
    date: "2024-12-05",
    type: "expense",
  },

  // Gastos - Ocio
  {
    id: "13",
    description: "Cine",
    amount: 45,
    category: "Ocio",
    date: "2024-12-09",
    type: "expense",
  },
  {
    id: "14",
    description: "Bar",
    amount: 120,
    category: "Ocio",
    date: "2024-12-13",
    type: "expense",
  },
  {
    id: "15",
    description: "Videojuego",
    amount: 60,
    category: "Ocio",
    date: "2024-12-16",
    type: "expense",
  },

  // Gastos - Educación
  {
    id: "16",
    description: "Curso online",
    amount: 150,
    category: "Educación",
    date: "2024-12-02",
    type: "expense",
  },
  {
    id: "17",
    description: "Libros",
    amount: 80,
    category: "Educación",
    date: "2024-12-11",
    type: "expense",
  },

  // Gastos - Servicios
  {
    id: "18",
    description: "Netflix",
    amount: 35,
    category: "Servicios",
    date: "2024-12-01",
    type: "expense",
  },
  {
    id: "19",
    description: "Spotify",
    amount: 25,
    category: "Servicios",
    date: "2024-12-01",
    type: "expense",
  },
  {
    id: "20",
    description: "Internet",
    amount: 120,
    category: "Servicios",
    date: "2024-12-01",
    type: "expense",
  },
  {
    id: "21",
    description: "Celular",
    amount: 85,
    category: "Servicios",
    date: "2024-12-01",
    type: "expense",
  },
];

export const categoryData: CategoryData[] = [
  { name: "Alimentación", value: 700, color: "#FF6B6B", icon: "🍔" },
  { name: "Transporte", value: 310, color: "#4ECDC4", icon: "🚕" },
  { name: "Vivienda", value: 1030, color: "#45B7D1", icon: "🏠" },
  { name: "Ocio", value: 225, color: "#FFA07A", icon: "🎮" },
  { name: "Educación", value: 230, color: "#98D8C8", icon: "📚" },
  { name: "Servicios", value: 265, color: "#F7DC6F", icon: "💡" },
];

export const monthlyData: MonthlyData[] = [
  { month: "Enero", income: 3200, expenses: 2450, savings: 750 },
  { month: "Febrero", income: 3500, expenses: 2680, savings: 820 },
  { month: "Marzo", income: 3300, expenses: 3420, savings: -120 },
  { month: "Abril", income: 3800, expenses: 2890, savings: 910 },
  { month: "Mayo", income: 3500, expenses: 2720, savings: 780 },
  { month: "Junio", income: 4100, expenses: 3100, savings: 1000 },
  { month: "Julio", income: 3500, expenses: 2850, savings: 650 },
  { month: "Agosto", income: 3700, expenses: 2980, savings: 720 },
  { month: "Septiembre", income: 3500, expenses: 3200, savings: 300 },
  { month: "Octubre", income: 3600, expenses: 2750, savings: 850 },
  { month: "Noviembre", income: 3500, expenses: 2900, savings: 600 },
  { month: "Diciembre", income: 4300, expenses: 2760, savings: 1540 },
];

export const recurringExpenses: RecurringExpense[] = [
  { name: "Netflix", amount: 35, icon: "📺" },
  { name: "Spotify", amount: 25, icon: "🎵" },
  { name: "Plan Móvil", amount: 85, icon: "📱" },
  { name: "Internet", amount: 120, icon: "🌐" },
  { name: "Gimnasio", amount: 120, icon: "💪" },
  { name: "Amazon Prime", amount: 40, icon: "📦" },
];

export const alerts = [
  {
    type: "warning",
    message: "El gasto en ocio superó el presupuesto este mes",
    icon: "⚠️",
  },
  {
    type: "tip",
    message: "Reduciendo ocio en 10% ahorrarías S/ 120",
    icon: "💡",
  },
  {
    type: "info",
    message: "Gastos hormiga detectados: S/ 285 en compras menores",
    icon: "📉",
  },
];

// Funciones auxiliares
export const calculateTotalIncome = (): number => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpenses = (): number => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateSavings = (): number => {
  return calculateTotalIncome() - calculateTotalExpenses();
};

export const calculateExpensePercentage = (): number => {
  const income = calculateTotalIncome();
  const expenses = calculateTotalExpenses();
  return income > 0 ? Math.round((expenses / income) * 100) : 0;
};

export const calculateSavingsPercentage = (): number => {
  const income = calculateTotalIncome();
  const savings = calculateSavings();
  return income > 0 ? Math.round((savings / income) * 100) : 0;
};

export const getTopCategory = (): CategoryData => {
  return categoryData.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );
};
