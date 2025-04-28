import CourseDetailPageClient from "./page.client";

const CourseDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return <CourseDetailPageClient slug={slug} />;
};

export default CourseDetailPage;
