import React from "react";
import { Video, BookOpenText, ChevronDown, ChevronUp } from "lucide-react";
import { CourseContentBookIcon, DropDownIcon, DropUpIcon, HeaderBookIcon, VideoCameraIcon } from "../../../../public/icons/course_details_page_icons";

interface LectureProps {
  title: string;
  duration: string;
  type: string;
}

const Lecture: React.FC<LectureProps> = ({ title, duration, type }) => (
  <div className="flex items-center px-5 py-2.5">
    {type === "video" ? (
      <VideoCameraIcon width={24} height={24} className="mr-2.5" color="#7B878D" strokeWidth={1.8} />
    ) : (
      <CourseContentBookIcon width={24} height={24} className="mr-2.5" color="#7B878D" strokeWidth={1.8} />
    )}
    <span className="grow text-base text-neutral-900 max-md:text-sm max-sm:text-xs">{title}</span>
    <span className="text-base text-neutral-900 max-md:text-sm max-sm:text-xs">{duration}</span>
  </div>
);

interface CourseSectionProps {
  title: string;
  stats: string;
  lectures?: LectureProps[];
  expanded?: boolean;
  onToggle: () => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  stats,
  lectures = [],
  expanded = false,
  onToggle,
}) => {
  return (
    <article className="mb-5 rounded-xl border border-solid bg-slate-50 border-slate-200">
      <header className="flex justify-between items-center px-5 py-2.5 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-2">
          {expanded ? (
            <DropUpIcon width={21} height={15} className="text-neutral-500 p-1" />
          ) : (
            <DropDownIcon width={21} height={15} className="text-neutral-500 p-1" />
          )}
          <h3 className="text-lg font-semibold text-neutral-900 max-md:text-sm max-sm:text-xs ml-3">{title}</h3>
        </div>
        <div className="flex items-center">
          <span className="text-base text-neutral-900 max-md:text-sm max-sm:text-xs">{stats}</span>
        </div>
      </header>
      {expanded && (
        <div>
          {lectures.map((lecture, index) => (
            <Lecture key={index} {...lecture} />
          ))}
        </div>
      )}
    </article>
  );
};
