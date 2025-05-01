export interface ICourseContent {
  id: string;
  _id: string;
  courseId: string;
  title: string;
  description: string;
  contentType: "video" | "document";
  contentUrl: string;
  duration: string;
  order: number;
  isBlocked: boolean;
  allowDownload: boolean;
  allowPreview: boolean;
  sectionName: string;
}

export type CourseContentCreatePayload = Omit<ICourseContent, "id" | "_id">;

export type CourseContentUpdatePayload = Partial<CourseContentCreatePayload>;
