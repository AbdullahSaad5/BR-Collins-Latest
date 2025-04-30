import CourseDetailPageClient from "./page.client";
import { api } from "@/app/utils/axios";

const CourseDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}?content=true`, {
    next: {
      revalidate: 0,
    },
  });
  const res = await response.json();
  const course = res.data;

  console.log(course);

  return <CourseDetailPageClient course={course} />;
};

export default CourseDetailPage;
