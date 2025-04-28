"use client";
import React, { useState } from "react";
import CustomDataTable from "./CustomDataTable";

interface Transaction {
  id: number;
  student: string;
  course: string;
  amount: string;
  date: string;
  status: string;
  paymentMethod: string;
}

const data: Transaction[] = [
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
];

const Transactions = () => {
  const columns = [
    {
      name: "Student",
      selector: (row: Transaction) => row.student,
      sortable: true,
      grow: 1,
      cell: (row: Transaction) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.student}>
          {row.student}
        </div>
      ),
    },
    {
      name: "Course",
      selector: (row: Transaction) => row.course,
      sortable: true,
      grow: 1,
      cell: (row: Transaction) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.course}>
          {row.course}
        </div>
      ),
    },
    {
      name: "Amount",
      selector: (row: Transaction) => row.amount,
      sortable: true,
      grow: 0.5,
      cell: (row: Transaction) => <div className="text-base text-left text-neutral-900">{row.amount}</div>,
    },
    {
      name: "Date",
      selector: (row: Transaction) => row.date,
      sortable: true,
      grow: 0.5,
      cell: (row: Transaction) => <div className="text-base text-left text-neutral-900">{row.date}</div>,
    },
    {
      name: "Status",
      selector: (row: Transaction) => row.status,
      sortable: true,
      grow: 0.5,
      cell: (row: Transaction) => (
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
            row.status === "Completed" ? "text-green-600 bg-emerald-50" : "text-yellow-600 bg-yellow-50"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Payment Method",
      selector: (row: Transaction) => row.paymentMethod,
      sortable: true,
      grow: 0.5,
      cell: (row: Transaction) => <div className="text-base text-left text-neutral-900">{row.paymentMethod}</div>,
    },
  ];

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">Transactions</h2>
      </div>

      <CustomDataTable
        columns={columns}
        data={data}
        isLoading={false}
        error={null}
        noDataMessage="No transactions found"
      />
    </section>
  );
};

export default Transactions;
