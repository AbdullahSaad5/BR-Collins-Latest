import React, { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, ArrowLeft } from "lucide-react";
import { ICourse } from "@/app/types/course.contract";
import { ICourseContent } from "@/app/types/course-content.contract";

interface CoursePlayerProps {
  course: ICourse;
  content: ICourseContent[];
  onBack: () => void;
  onCompleteLesson: (contentId: string) => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, content, onBack, onCompleteLesson }) => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const currentContent = content[currentContentIndex];

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentContentIndex < content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
  };

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(currentContent._id)) {
      setCompletedLessons([...completedLessons, currentContent._id]);
      onCompleteLesson(currentContent._id);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <button onClick={onBack} className="mb-4 flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Courses
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Lesson {currentContentIndex + 1} of {content.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF6B00]"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#10B981]"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Video/Content Area */}
        <div className="flex-1">
          <div className="rounded-xl bg-black shadow-lg">
            {currentContent.contentType === "video" ? (
              <div className="relative aspect-video">
                <video src={currentContent.contentUrl} className="h-full w-full object-contain" controls />
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center bg-gray-100">
                <div className="max-w-2xl p-8">
                  <h4 className="mb-4 text-xl font-semibold">{currentContent.title}</h4>
                  <p className="text-gray-600">{currentContent.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Details */}
          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">{currentContent.title}</h3>
            <p className="text-gray-600">{currentContent.description}</p>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentContentIndex === 0}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous Lesson
            </button>
            <button
              onClick={handleCompleteLesson}
              disabled={completedLessons.includes(currentContent._id)}
              className="rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF8533] disabled:opacity-50"
            >
              {completedLessons.includes(currentContent._id) ? "Completed" : "Mark as Complete"}
            </button>
            <button
              onClick={handleNext}
              disabled={currentContentIndex === content.length - 1}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Next Lesson
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h4 className="mb-4 text-lg font-medium text-gray-900">Course Content</h4>
            <div className="space-y-2">
              {content.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => setCurrentContentIndex(index)}
                  className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors duration-200 ${
                    currentContentIndex === index ? "bg-[#FF6B00] text-white" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    {item.contentType === "video" ? <BookOpen className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.duration}</p>
                  </div>
                  {completedLessons.includes(item._id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
