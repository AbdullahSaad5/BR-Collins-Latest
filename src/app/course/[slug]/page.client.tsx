"use client";
import React from "react";
import { InstructorSection } from "../../components/CourseDetail/InstructorSection";
import { ReviewSection } from "../../components/CourseDetail/ReviewSection";
import CourseDetail from "../../components/CourseDetail/CourseDetail";
import { StarRating } from "@/app/components/CourseDetail/StarRating";
import { Send, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ICourse } from "@/app/types/course.contract";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { addToCart } from "@/app/store/features/cart/cartSlice";

const socialIcons = [{ Icon: Facebook }, { Icon: Twitter }, { Icon: Linkedin }, { Icon: Instagram }];

const toTitleCase = (str: string) => {
  return str.replace(/\B([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
};

const CourseDetailPageClient = ({ course }: { course: ICourse }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const handleAddToCart = () => {
    const isCourseInCart = items.some((item) => item._id === course._id);
    if (!isCourseInCart) {
      dispatch(addToCart(course));
    }
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  // Map API course data to frontend display format
  const displayCourse = {
    slug: course.slug,
    duration: `${course.noOfHours} Hrs`,
    title: toTitleCase(course.title),
    overview: course.overview,
    subtitle: course.subtitle,
    instructor: course.instructor,
    lessons: course.noOfLessons,
    rating: course.rating,
    price: `$${course.discountPrice ? course.discountPrice : course.price}`,
    originalPrice: course.price,
    isNew: course.bestSeller,
    // imageUrl: course.coverImageUrl,
    imageUrl: "/img/Course/Course.png",
    courseDetails: {
      startDate:
        course.startDate instanceof Date
          ? course.startDate.toLocaleDateString()
          : new Date(course.startDate).toLocaleDateString(),
      enrolled: course.noOfStudents || 100,
      lectures: course.noOfLessons,
      skillLevel: course.skillLevel,
      language: course.language,
      quizzes: course.noOfQuizzes,
      certificate: course.hasCertificate ? "Yes" : "No",
    },
    description: course.description,
    learningObjectives: course.whatYouWillLearn,
    requirements:
      course.requirements.length > 0
        ? course.requirements
        : ["This course is for beginners", "No prior knowledge required", "All levels welcome"],
    sections: [
      {
        title: "Introduction to Course",
        stats: "3 lectures • 1hr 30 min",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/62b824286fd0acfa901dd05cd9fdd8f82eedcc53?placeholderIfAbsent=true",
        lectures: [
          {
            title: "Module 1: Introduction to Office Administration",
            duration: "30:00",
            type: "video",
          },
          {
            title: "Module 2: Communication in the Workplace",
            duration: "30:00",
            type: "video",
          },
          {
            title: "Module 3: Time Management & Organization",
            duration: "30:00",
            type: "video",
          },
          {
            title: "Module 4: Time Management & Organization",
            duration: "30:00",
            type: "book",
          },
        ],
      },
      {
        title: "Course Fundamentals",
        stats: "6 lectures • 2hr 30 min",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a9582ecadffb53b1570073486c3f4e6e7eb3ff4?placeholderIfAbsent=true",
        lectures: [
          {
            title: "Module 1: Core Administrative Skills",
            duration: "45:00",
            type: "video",
          },
          {
            title: "Module 2: Effective Communication Techniques",
            duration: "45:00",
            type: "video",
          },
        ],
      },
      {
        title: "You can develop skill and setup",
        stats: "6 lectures • 2hr 30 min",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a9582ecadffb53b1570073486c3f4e6e7eb3ff4?placeholderIfAbsent=true",
        lectures: [
          {
            title: "Module 1: Core Administrative Skills",
            duration: "45:00",
            type: "video",
          },
          {
            title: "Module 2: Effective Communication Techniques",
            duration: "45:00",
            type: "video",
          },
        ],
      },
      {
        title: "You can develop skill and setup",
        stats: "6 lectures • 2hr 30 min",
        icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a9582ecadffb53b1570073486c3f4e6e7eb3ff4?placeholderIfAbsent=true",
        lectures: [
          {
            title: "Module 1: Core Administrative Skills",
            duration: "45:00",
            type: "video",
          },
          {
            title: "Module 2: Effective Communication Techniques",
            duration: "45:00",
            type: "video",
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-neutral-900">
          <section className="flex flex-col items-start mx-auto max-w-[1326px] pt-5 pb-32 lg:px-2 max-md:pb-24 max-md:px-4 max-md:w-full">
            {/* Breadcrumbs */}
            <nav className="flex gap-1 items-end self-start text-base text-white max-md:items-center">
              <a href="#">Home</a>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f8a4ef21cebf71bbe62d3a6b83740a760828aca?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                alt="Breadcrumb separator"
                className="object-contain shrink-0 aspect-square w-[18px]"
              />
              <a href="#">Courses</a>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f8a4ef21cebf71bbe62d3a6b83740a760828aca?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                alt="Breadcrumb separator"
                className="object-contain shrink-0 aspect-square w-[18px]"
              />
              <a href="#" className="font-semibold text-sky-500">
                {displayCourse.title}
              </a>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col mt-24 w-[648px] max-md:mt-10 max-md:w-full">
              <div className="w-full text-white min-h-[196px]">
                <h1 className="text-5xl font-bold leading-[58px] max-md:text-4xl max-md:leading-[49px]">
                  {displayCourse.title}
                </h1>
                <p className="mt-5 text-xl leading-8 max-md:text-lg max-md:leading-7">{displayCourse.subtitle}</p>
              </div>

              {/* Stats Section */}
              <div className="flex flex-col mt-10 w-[577px] max-md:w-full">
                <div className="flex flex-wrap gap-3 items-center w-full">
                  {/* {course.isNew && ( */}
                  <div className="flex gap-1 items-center px-3 py-1.5 text-base font-medium text-black whitespace-nowrap bg-orange-300 rounded-md max-md:text-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1099e32fc8790b4b60ad2b6a14e0383d2ac123fe?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                      alt="Bestseller badge"
                      className="object-contain shrink-0 aspect-[0.81] w-[13px]"
                    />
                    <span>Bestseller</span>
                  </div>
                  {/* )} */}

                  {/* Rating */}
                  <div className="flex gap-1.5 items-center">
                    <span className="text-lg font-medium text-white max-md:text-base">{displayCourse.rating}</span>
                    <StarRating rating={displayCourse.rating} />
                    <a href="#" className="text-base text-white underline max-md:text-sm">
                      {displayCourse.lessons}+ rating
                    </a>
                  </div>

                  {/* Divider - hidden on mobile */}
                  <div className="grow shrink h-5 border border-solid border-white border-opacity-50 max-md:hidden" />

                  {/* Stats */}
                  <div className="flex gap-4 items-center max-md:gap-3 max-md:w-full max-md:justify-start max-md:mt-3">
                    <div className="flex gap-1 items-center">
                      <img
                        src="/img/coursedetail/lesson.svg"
                        alt="Lessons icon"
                        className="object-contain shrink-0 w-5 aspect-square max-md:w-4"
                      />
                      <span className="text-base max-md:text-sm text-white">{displayCourse.lessons} Lessons</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      <img
                        src="/img/coursedetail/person.svg"
                        alt="Students icon"
                        className="object-contain shrink-0 w-5 aspect-square max-md:w-4"
                      />
                      <span className="text-base max-md:text-sm text-white">
                        {displayCourse.courseDetails.enrolled} Students
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex gap-8 lg:mt-20 max-[1230px]:flex-col w-full max-w-[1326px] mx-auto max-lg:px-3 px-2">
        {/* Left Content */}
        <div className="flex-1 max-lg:w-full max-[1230px]:order-2 [1230px]:max-w-[720px] max-[1230px]:w-full">
          <div className="w-full ">
            {/* Course content */}
            <section className="mt-12 max-md:mt-10 ml-auto">
              <div className="flex gap-2 items-center text-3xl text-neutral-900">
                <nav className="flex gap-3 items-center overflow-x-auto whitespace-nowrap max-md:max-w-full">
                  {[
                    { label: "Overview", active: true },
                    { label: "Course Content" },
                    { label: "Details" },
                    { label: "Instructor" },
                    { label: "Review" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 px-6 py-2 min-h-[40px] rounded-full text-lg font-medium ${
                        item.active ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      } transition-colors max-md:px-3 max-md:py-1.5 max-md:text-xs max-md:min-h-[36px]`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-12 text-neutral-900 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                <article className="w-full max-md:max-w-full">
                  <h2 className="text-3xl font-bold max-md:max-w-full">What you'll learn</h2>
                  <div className="mt-8 w-full text-base leading-6 max-md:max-w-full">
                    {/* Add Overview here */}
                    <p className="mt-5 text-base leading-8 max-md:text-lg max-md:leading-7 mb-6">
                      {displayCourse.overview}
                    </p>
                    <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                      {displayCourse.learningObjectives.map((objective, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e250ce5e477b6a62341118a96947307c91c70fef?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
                            alt="Checkmark"
                            className="object-contain shrink-0 w-6 aspect-square"
                          />
                          <p className="w-[291px]">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <CourseDetail
              sections={displayCourse.sections}
              requirements={displayCourse.requirements}
              description={displayCourse.description}
            />
            <InstructorSection />
            <ReviewSection />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="relative w-[40%] flex-shrink-0 lg:transform lg:-translate-y-1/6 max-[1230px]:w-full max-[1230px]:order-1 max-[1230px]:mt-0 max-[1230px]:mb-8 max-[1230px]:transform-none">
          <div className="grow w-full pt-8 bg-white rounded-3xl border border-slate-200 shadow-[0px_4px_75px_rgba(0,0,0,0.06)] max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col px-8 max-md:px-5 w-full">
              {/* Course Preview */}
              <div className="relative w-full min-h-[280px] text-xl font-bold text-white rounded-2xl shadow-[0px_4px_75px_rgba(0,0,0,0.06)] overflow-hidden text-center max-md:max-w-full">
                <img
                  src={displayCourse.imageUrl}
                  alt="Course preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button className="relative pt-56 pb-6 px-16 max-md:pt-24 max-md:px-5 w-full">
                  Preview this course
                </button>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-8 font-extrabold text-center text-neutral-900">
                <span className="text-3xl leading-none">{displayCourse.price}</span>
                {displayCourse.originalPrice && (
                  <span className="text-xl leading-tight line-through text-neutral-400">
                    {displayCourse.originalPrice}
                  </span>
                )}
                {/* <span className="px-3 py-1.5 text-base text-black uppercase bg-orange-300 rounded-md">
                  {Math.round((1 - parseFloat(course.price.replace('$', '')) / parseFloat(course.originalPrice.replace('$', ''))) * 100)}% off
                </span> */}
              </div>

              {/* Course Modes */}
              <div className="mt-8 w-full text-center max-md:max-w-full">
                <div className="text-white font-semibold text-xl space-y-3 max-md:max-w-full">
                  <button className="w-full min-h-[58px] bg-orange-500 rounded-[58px]">e-learning</button>
                  <button
                    onClick={handleAddToCart}
                    className="w-full min-h-[58px] bg-sky-500 rounded-[58px] hover:bg-sky-600 transition-colors"
                  >
                    in-person
                  </button>
                </div>
                <p className="mt-5 text-base font-medium text-neutral-400">30-Day Money-Back Guarantee</p>
              </div>

              {/* Details Table */}
              <div className="flex flex-wrap gap-9 mt-12 text-lg text-neutral-900 w-full max-md:mt-10">
                <div className="overflow-hidden grow shrink-0 basis-0 w-fit h-[318px] max-md:max-w-full">
                  {Object.entries(displayCourse.courseDetails).map(([label, value], index) => (
                    <div key={label}>
                      <div className="flex justify-between items-center w-full">
                        <span>{toTitleCase(label)}</span>
                        <span className="font-semibold text-right">{value}</span>
                      </div>
                      {index < Object.keys(displayCourse.courseDetails).length - 1 && (
                        <div className="mt-4 w-full border-t border-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="self-start shrink-0 w-1.5 h-[190px] bg-slate-200 rounded-xl" />
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center px-14 py-9 mt-10 bg-sky-50 max-md:px-5 max-md:max-w-full">
              <div className="text-center text-neutral-900">
                <p className="text-md">For details about the course</p>
                <p className="mt-3.5 text-2xl font-extrabold leading-none">
                  <span className="text-[#F86537]">Call Us: </span>
                  <span className="underline">+444 555 667</span>
                </p>
              </div>
              <div className="flex items-center justify-center mt-12 w-[178px] min-h-10 mx-auto max-md:mt-10 gap-1">
                {socialIcons.map(({ Icon }, idx) => (
                  <Icon
                    key={idx}
                    className="text-[#85AABA] text-xl"
                    style={{
                      backgroundColor: "#0F2B39",
                      borderRadius: "9999px",
                      padding: "12px",
                      width: "45px",
                      height: "45px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPageClient;
