'use client';

import { useState } from 'react';

interface Result {
  monthly: number;
  total: number;
  interest: number;
}

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    setError('');
    setResult(null);

    const P = parseFloat(loanAmount) - parseFloat(downPayment || '0');
    const r = parseFloat(annualRate) / 100 / 12;
    const n = parseInt(months);

    if (isNaN(P) || isNaN(n) || n <= 0) {
      setError('Please fill in all fields with valid numbers.');
      return;
    }
    if (P <= 0) {
      setError('Loan amount must be greater than down payment.');
      return;
    }

    const M = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = M * n;

    setResult({ monthly: M, total, interest: total - P });
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Car Payment Calculator</h1>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Loan Amount ($)
            <input
              type="number"
              min="0"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g. 25000"
              className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Down Payment ($)
            <input
              type="number"
              min="0"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g. 5000"
              className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Annual Interest Rate (%)
            <input
              type="number"
              min="0"
              step="0.01"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="e.g. 6.5"
              className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Loan Duration (months)
            <input
              type="number"
              min="1"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="e.g. 60"
              className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            Calculate
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col gap-3">
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-1">Estimated Monthly Payment</p>
              <p className="text-4xl font-bold text-blue-600">{fmt(result.monthly)}</p>
            </div>
            <hr className="border-slate-200" />
            <div className="flex justify-between text-sm text-slate-700">
              <span>Total Amount Paid</span>
              <span className="font-semibold">{fmt(result.total)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-700">
              <span>Total Interest Paid</span>
              <span className="font-semibold">{fmt(result.interest)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
