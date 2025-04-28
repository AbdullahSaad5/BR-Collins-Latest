import { ICourse } from "./course.contract";

export interface ICourseContent {
  id: string;
  courseId: string;
  title: string;
  description: string;
  contentType: string;
  contentUrl: string;
  duration: string;
  order: number;
  isBlocked: boolean;
}

export type CourseContentCreatePayload = Omit<ICourseContent, "id">;

export type CourseContentUpdatePayload = Partial<CourseContentCreatePayload>;
