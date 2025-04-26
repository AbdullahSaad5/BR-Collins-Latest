"use client";
import React from "react";
import { AddUserIcon, ViewIcon } from "./Icons";
import CustomDataTable from "./CustomDataTable";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { IUser } from "@/app/types/user.contract";
import { transformUserType } from "@/app/utils/string-manipulation/transform-user-type";
import { useAppSelector } from "@/app/store/hooks";
import { getRefreshToken } from "@/app/store/features/users/userSlice";

const fetchUsers = async (refreshToken: string): Promise<{ data: IUser[] }> => {
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data;
};

const UserTable: React.FC = () => {
  const refreshToken = useAppSelector(getRefreshToken);
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(refreshToken!),
    select: (data) => data.data,
    enabled: !!refreshToken,
  });

  const columns = [
    {
      name: "Name",
      selector: (row: IUser) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      grow: 1,
      cell: (row: IUser) => (
        <div className="text-base text-left text-neutral-900 truncate" title={`${row.firstName} ${row.lastName}`}>
          {row.firstName} {row.lastName}
        </div>
      ),
    },
    {
      name: "Email Address",
      selector: (row: IUser) => row.email,
      sortable: true,
      grow: 1.5,
      cell: (row: IUser) => (
        <div className="text-base text-left text-neutral-900 truncate" title={row.email}>
          {row.email}
        </div>
      ),
    },
    {
      name: "Role",
      selector: (row: IUser) => row.role,
      sortable: true,
      grow: 1,
      cell: (row: IUser) => <div className="text-base text-left text-neutral-900">{transformUserType(row.role)}</div>,
    },
    {
      name: "Status",
      selector: (row: IUser) => row.status,
      sortable: true,
      grow: 1,
      cell: (row: IUser) => (
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
            row.status === "active"
              ? "text-green-600 bg-emerald-50"
              : row.status === "inactive"
              ? "text-gray-600 bg-gray-50"
              : row.status === "blocked"
              ? "text-red-600 bg-red-50"
              : "text-gray-600 bg-gray-50"
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: IUser) => (
        <button aria-label="View user details" className="text-gray-500 hover:text-gray-700 transition-colors">
          <ViewIcon className="w-5 h-5" />
        </button>
      ),
      grow: 0.5,
    },
  ];

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">View Users</h1>
        <button className="flex gap-2 items-center text-base font-medium text-orange-500 hover:text-orange-600 transition-colors">
          <AddUserIcon className="w-5 h-5" />
          <span>Add New User</span>
        </button>
      </div>

      <CustomDataTable
        columns={columns}
        data={users || []}
        isLoading={isLoading}
        error={error}
        noDataMessage="No users found"
      />
    </section>
  );
};

export default UserTable;
