import React from "react";
import { 
  FiBook, 
  FiBookOpen, 
  FiCheckCircle 
} from "react-icons/fi";

interface StatCardProps {
  icon: React.ReactNode;
  count: string;
  label: string;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  count, 
  label, 
  bgColor, 
  textColor 
}) => {
  return (
    <div className={`flex flex-col ${bgColor} p-6 rounded-xl w-full max-w-xs`}>
      <div className={`${textColor} text-2xl`}>
        {icon}
      </div>
      <div className="mt-4 text-3xl font-bold text-black">{count}</div>
      <div className="mt-1 text-lg text-gray-600">{label}</div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <section className="flex flex-col mt-10 max-md:max-w-full">
      <h2 className="self-start text-2xl font-bold text-neutral-900">
        Dashboard
      </h2>
      <div className="flex flex-nowrap gap-3 flex-row items-center mt-5 max-md:max-w-full">
        <StatCard
          icon={<FiBook className="text-2xl" />}
          count="30"
          label="Enrolled Courses"
          bgColor="bg-blue-50"
          textColor="text-sky-500"
        />
        <StatCard
          icon={<FiBookOpen className="text-2xl" />}
          count="10"
          label="Active Courses"
          bgColor="bg-rose-50"
          textColor="text-orange-500"
        />
        <StatCard
          icon={<FiCheckCircle className="text-2xl" />}
          count="12"
          label="Completed Courses"
          bgColor="bg-emerald-50"
          textColor="text-green-600"
        />
      </div>
    </section>
  );
};

export default DashboardStats;