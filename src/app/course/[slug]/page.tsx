import CourseDetailPageClient from "./page.client";
import { api } from "@/app/utils/axios";

const CourseDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  console.log(slug);
  // Fetch the specific course data
  const response = await api.get(`/courses/${slug}`);
  const course = response.data.data;
  console.log(course);

  return <CourseDetailPageClient course={course} />;
};

export default CourseDetailPage;
