import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, PieChart, BarChart2, Download } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { UpgradePrompt } from './UpgradePrompt';

interface FinancialMetrics {
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  burnRate: number;
  runway: number;
}

interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
}

const initialExpenses: ExpenseCategory[] = [
  { id: 'salaries', name: 'Salaries', amount: 0, percentage: 0 },
  { id: 'marketing', name: 'Marketing', amount: 0, percentage: 0 },
  { id: 'office', name: 'Office & Equipment', amount: 0, percentage: 0 },
  { id: 'software', name: 'Software & Tools', amount: 0, percentage: 0 },
  { id: 'other', name: 'Other Expenses', amount: 0, percentage: 0 },
];

export const FinancialPlanning: React.FC = () => {
  const { hasFeature } = useSubscription();
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [expenses, setExpenses] = useState<ExpenseCategory[]>(initialExpenses);
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    revenue: 0,
    expenses: 0,
    profit: 0,
    profitMargin: 0,
    burnRate: 0,
    runway: 0,
  });

  useEffect(() => {
    if (!hasFeature('financialTools')) {
      setShowUpgradePrompt(true);
      return;
    }
    calculateMetrics();
  }, [monthlyRevenue, expenses]);

  const calculateMetrics = () => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const profit = monthlyRevenue - totalExpenses;
    const profitMargin = monthlyRevenue > 0 ? (profit / monthlyRevenue) * 100 : 0;
    const burnRate = totalExpenses / 30; // Daily burn rate
    const runway = profit < 0 ? Math.abs(profit / burnRate) : Infinity;

    // Calculate expense percentages
    const updatedExpenses = expenses.map(exp => ({
      ...exp,
      percentage: totalExpenses > 0 ? (exp.amount / totalExpenses) * 100 : 0,
    }));

    setExpenses(updatedExpenses);
    setMetrics({
      revenue: monthlyRevenue,
      expenses: totalExpenses,
      profit,
      profitMargin,
      burnRate,
      runway,
    });
  };

  const handleExpenseChange = (id: string, value: string) => {
    const amount = parseFloat(value) || 0;
    setExpenses(prev =>
      prev.map(exp =>
        exp.id === id ? { ...exp, amount } : exp
      )
    );
  };

  const handleRevenueChange = (value: string) => {
    setMonthlyRevenue(parseFloat(value) || 0);
  };

  const downloadReport = () => {
    const report = `Financial Planning Report

Monthly Revenue: $${metrics.revenue.toLocaleString()}
Total Expenses: $${metrics.expenses.toLocaleString()}
Net Profit: $${metrics.profit.toLocaleString()}
Profit Margin: ${metrics.profitMargin.toFixed(1)}%
Daily Burn Rate: $${metrics.burnRate.toFixed(2)}
Runway: ${metrics.runway === Infinity ? 'Infinite' : `${Math.floor(metrics.runway)} days`}

Expense Breakdown:
${expenses.map(exp => `${exp.name}: $${exp.amount.toLocaleString()} (${exp.percentage.toFixed(1)}%)`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-planning-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!hasFeature('financialTools')) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Financial Planning</h1>
        <p className="text-gray-600">
          Plan and track your startup's financial metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={monthlyRevenue || ''}
                onChange={(e) => handleRevenueChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h2>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id}>
                  <label htmlFor={expense.id} className="block text-sm font-medium text-gray-700 mb-1">
                    {expense.name}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id={expense.id}
                      value={expense.amount || ''}
                      onChange={(e) => handleExpenseChange(expense.id, e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Financial Metrics</h2>
              <button
                onClick={downloadReport}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Profit Margin</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.profitMargin.toFixed(1)}%
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <Calculator className="w-5 h-5" />
                  <span className="text-sm font-medium">Daily Burn Rate</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ${metrics.burnRate.toFixed(2)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <PieChart className="w-5 h-5" />
                  <span className="text-sm font-medium">Runway</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {metrics.runway === Infinity ? 'Infinite' : `${Math.floor(metrics.runway)} days`}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Breakdown</h3>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.id} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{expense.name}</span>
                      <span className="text-sm text-gray-500">
                        ${expense.amount.toLocaleString()} ({expense.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpgradePrompt && (
        <UpgradePrompt
          currentPlan="starter"
          feature="Financial Planning Tools"
          onClose={() => setShowUpgradePrompt(false)}
        />
      )}
    </div>
  );
}; 