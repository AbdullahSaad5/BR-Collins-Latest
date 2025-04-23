"use client";
import React from "react";

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

interface CheckboxItemProps {
  label?: string;
  children?: React.ReactNode;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, children }) => {
  return (
    <section className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold text-neutral-900 max-md:text-lg max-sm:text-base">
        {title}
      </h3>
      {children}
    </section>
  );
};

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, children }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer">
      <input type="checkbox" className="hidden" />
      <div className="w-6 h-6 bg-white rounded-md border-2 border-solid border-zinc-200" />
      {label && (
        <span className="text-base text-neutral-900 max-md:text-base max-sm:text-sm">
          {label}
        </span>
      )}
      {children}
    </label>
  );
};

const ShowMoreButton: React.FC = () => {
  const handleShowMore = () => {
    console.log("Show more clicked");
  };

  return (
    <button
      onClick={handleShowMore}
      className="text-base font-semibold text-sky-500 underline cursor-pointer"
    >
      Show more
    </button>
  );
};

const FilterSection = () => {
  return (
    <aside className="flex flex-col p-0 mx-auto max-w-none bg-white w-[385px] max-md:px-4 max-md:py-0 max-md:w-full max-md:max-w-[991px] max-sm:px-3 max-sm:py-0 max-sm:max-w-screen-sm">
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold text-neutral-900 max-md:text-lg max-sm:text-base">
          Filter By
        </h2>

        <FilterGroup title="Topic Categories">
          <div className="flex flex-col gap-3">
            <CheckboxItem label="Business Writing Techniques" />
            <CheckboxItem label="Anger Management" />
            <CheckboxItem label="Administrative Support" />
          </div>
          <ShowMoreButton />
        </FilterGroup>

        <hr className="w-full h-px bg-zinc-200" />

        <FilterGroup title="By Language">
          <div className="flex flex-col gap-3">
            <CheckboxItem label="English" />
            <CheckboxItem label="Arabic" />
          </div>
        </FilterGroup>

        <hr className="w-full h-px bg-zinc-200" />

        <FilterGroup title="By Video Duration">
          <div className="flex flex-col gap-3">
            <CheckboxItem label="0-1 Hours" />
            <CheckboxItem label="1-3 Hours" />
            <CheckboxItem label="3-6 Hours" />
          </div>
          <ShowMoreButton />
        </FilterGroup>
      </div>
    </aside>
  );
};

export default FilterSection;