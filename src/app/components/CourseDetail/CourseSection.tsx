import React from "react";
import { Video, BookOpenText } from "lucide-react";

interface LectureProps {
  title: string;
  duration: string;
  type: "video" | "book";
}

const Lecture: React.FC<LectureProps> = ({ title, duration, type }) => (
  <div className="flex items-center px-5 py-2.5">
    {type === "video" ? (
      <Video 
        size={24}
        className="mr-2.5"
        color="#7B878D"
        strokeWidth={1.8}
      />
    ) : (
      <BookOpenText 
        size={24}
        className="mr-2.5"
        color="#7B878D"
        strokeWidth={1.8}
      />
    )}
    <span className="grow text-base text-neutral-900 max-md:text-sm max-sm:text-xs">
      {title}
    </span>
    <span className="text-base text-neutral-900 max-md:text-sm max-sm:text-xs">
      {duration}
    </span>
  </div>
);
interface CourseSectionProps {
  title: string;
  stats: string;
  icon: string;
  lectures?: LectureProps[];
  expanded?: boolean;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  stats,
  icon,
  lectures = [],
  expanded = false,
}) => {
  return (
    <article className="mb-5 rounded-xl border border-solid bg-slate-50 border-slate-200">
      <header className="flex justify-between items-center px-5 py-2.5">
        <img src={icon} alt="icon" className="mr-2.5 w-5 h-5" />
        <h3 className="text-lg font-semibold text-neutral-900 max-md:text-sm max-sm:text-xs">
          {title}
        </h3>
        <span className="text-base text-neutral-900 max-md:text-sm max-sm:text-xs">
          {stats}
        </span>
      </header>
      {expanded &&
        lectures.map((lecture, index) => <Lecture key={index} {...lecture} />)}
    </article>
  );
};
