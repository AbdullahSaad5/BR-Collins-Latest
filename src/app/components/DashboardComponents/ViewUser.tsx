"use client";
import React, { useState } from "react";
import { AddUserIcon } from "./Icons";
import CustomDataTable from "./CustomDataTable";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { IUser } from "@/app/types/user.contract";
import { transformUserType } from "@/app/utils/string-manipulation/transform-user-type";
import { useAppSelector } from "@/app/store/hooks";
import { getRefreshToken } from "@/app/store/features/users/userSlice";
import ActionIcons from "@/components/ActionIcons";
import ViewUserModal from "./ViewUserModal";
import { useRouter } from "next/navigation";
import StatusMenu from "./StatusMenu";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const fetchUsers = async (refreshToken: string): Promise<{ data: IUser[] }> => {
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.data;
};

const updateUserStatus = async (userId: string, isBlocked: boolean, refreshToken: string): Promise<void> => {
  await api.put(
    `/users/${userId}`,
    { isBlocked },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

const UserTable: React.FC = () => {
  const refreshToken = useAppSelector(getRefreshToken);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const handleViewUser = (user: IUser) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user: IUser) => {
    // Navigate to AddUser page with user data as query parameter
    router.push(`/dashboard?item=addUser&edit=true&userId=${user.id}`);
  };

  const handleDeleteUser = (user: IUser) => {
    // TODO: Implement delete user functionality
    console.log("Delete user:", user);
  };

  const handleToggleStatus = async (user: IUser, isBlocked: boolean) => {
    try {
      await updateUserStatus(user.id, isBlocked, refreshToken!);
      // Refetch users to update the table
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

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
      selector: (row: IUser) => row.isBlocked,
      sortable: true,
      grow: 1,
      cell: (row: IUser) => (
        <StatusMenu isBlocked={row.isBlocked} onStatusChange={(isBlocked) => handleToggleStatus(row, isBlocked)} />
      ),
    },
    {
      name: "Actions",
      cell: (row: IUser) => (
        <ActionIcons
          onView={() => handleViewUser(row)}
          onEdit={() => handleEditUser(row)}
          viewTooltip="View User Details"
          editTooltip="Edit User"
          deleteTooltip="Delete User"
          disabled={{
            view: false,
            edit: row.role === "admin", // Prevent editing admin users
            delete: row.role === "admin", // Prevent deleting admin users
          }}
        />
      ),
      grow: 0.5,
    },
  ];

  return (
    <section className="flex-1 p-5 rounded-xl bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">View Users</h1>
        {/* <button className="flex gap-2 items-center text-base font-medium text-orange-500 hover:text-orange-600 transition-colors">
          <AddUserIcon className="w-5 h-5" />
          <span>Add New User</span>
        </button> */}
      </div>

      <CustomDataTable
        columns={columns}
        data={users || []}
        isLoading={isLoading}
        error={error}
        noDataMessage="No users found"
      />

      <ViewUserModal user={selectedUser} isOpen={isViewModalOpen} onClose={handleCloseViewModal} />
    </section>
  );
};

export default UserTable;
