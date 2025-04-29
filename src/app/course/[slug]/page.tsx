import CourseDetailPageClient from "./page.client";
import { api } from "@/app/utils/axios";

const CourseDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`, {
    next: {
      revalidate: 300,
    },
  });
  const res = await response.json();
  const course = res.data;
  console.log(course);

  return <CourseDetailPageClient course={course} />;
};

export default CourseDetailPage;
