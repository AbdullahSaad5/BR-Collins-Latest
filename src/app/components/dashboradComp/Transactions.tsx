"use client";
import React, { useState } from "react";
import { ViewIcon, ArrowLeftIcon, ArrowRightIcon } from "./Icons";

interface Transaction {
  id: number;
  student: string;
  course: string;
  amount: string;
  date: string;
  status: string;
  paymentMethod: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      student: "John Doe",
      course: "Introduction to React",
      amount: "$99.00",
      date: "2024-03-15",
      status: "Completed",
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      student: "Jane Smith",
      course: "Advanced JavaScript",
      amount: "$149.00",
      date: "2024-03-14",
      status: "Completed",
      paymentMethod: "PayPal",
    },
    {
      id: 3,
      student: "Mike Johnson",
      course: "UI/UX Design Principles",
      amount: "$79.00",
      date: "2024-03-13",
      status: "Pending",
      paymentMethod: "Bank Transfer",
    },
  ]);

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">Transactions</h2>
      </div>

      <div className="w-full border-collapse">
        {/* Table Header */}
        <div className="flex items-center p-3 rounded-lg bg-slate-100">
          <div className="w-[20%] text-base font-medium text-left text-neutral-900">Student</div>
          <div className="w-[20%] text-base font-medium text-left text-neutral-900">Course</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Amount</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Date</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Status</div>
          <div className="w-[15%] text-base font-medium text-left text-neutral-900">Payment Method</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col divide-y divide-slate-100">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center p-3 hover:bg-slate-50 transition-colors">
              <div className="w-[20%] text-base text-left text-neutral-900 truncate" title={transaction.student}>
                {transaction.student}
              </div>
              <div className="w-[20%] text-base text-left text-neutral-900 truncate" title={transaction.course}>
                {transaction.course}
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900">{transaction.amount}</div>
              <div className="w-[15%] text-base text-left text-neutral-900">{transaction.date}</div>
              <div className="w-[15%]">
                <span
                  className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                    transaction.status === "Completed" ? "text-green-600 bg-emerald-50" : "text-yellow-600 bg-yellow-50"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
              <div className="w-[15%] text-base text-left text-neutral-900">{transaction.paymentMethod}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 px-2">
        <div className="text-sm text-gray-500">Page 1 of 1</div>
        <div className="flex gap-4 items-center">
          <button
            aria-label="Previous page"
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            disabled
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button
            aria-label="Next page"
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            disabled
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
