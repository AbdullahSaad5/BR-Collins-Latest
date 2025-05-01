"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/utils/axios";
import { useAppSelector } from "@/app/store/hooks";
import { getAccessToken } from "@/app/store/features/users/userSlice";
import { ICourseContent } from "@/app/types/course-content.contract";
import CoursePlayer from "@/app/components/DashboardComponents/CoursePlayer";
import { useRouter } from "next/navigation";

export default function LearnCoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const accessToken = useAppSelector(getAccessToken);

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ["course", params.courseId],
    queryFn: async () => {
      const response = await api.get(`/courses/${params.courseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.data;
    },
    enabled: !!accessToken && !!params.courseId,
  });

  const { data: contentData, isLoading: contentLoading } = useQuery({
    queryKey: ["course-content", params.courseId],
    queryFn: async () => {
      const response = await api.get(`/course-contents/course/${params.courseId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.data;
    },
    enabled: !!accessToken && !!params.courseId,
  });

  const handleCompleteLesson = async (contentId: string) => {
    try {
      await api.post(
        `/user-courses/complete-lesson`,
        { contentId, courseId: params.courseId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to mark lesson as complete:", error);
    }
  };

  if (courseLoading || contentLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF6B00] border-t-transparent"></div>
      </div>
    );
  }

  if (!courseData || !contentData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-red-800">Failed to load course content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CoursePlayer
        course={courseData}
        content={contentData}
        onBack={() => router.push("/dashboard?item=enrolledCourses")}
        onCompleteLesson={handleCompleteLesson}
      />
    </div>
  );
}
