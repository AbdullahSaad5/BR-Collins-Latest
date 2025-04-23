import React from 'react'
import { CourseHero } from '../../components/CourseDetail/CourseHero'
import { CourseContent } from '../../components/CourseDetail/CourseContent'
import { CourseCard } from '../../components/CourseDetail/CourseCard'
import { InstructorSection } from '../../components/CourseDetail/InstructorSection'
import { ReviewSection } from '../../components/CourseDetail/ReviewSection'
import CourseDetail from '../../components/CourseDetail/CourseDetail'



const coursedetail = () => {
  return (
    <>
    
      
      {/* Hero Section */}
      <div className="relative">
        <CourseHero/>
        
        {/* Course Card positioned over Hero */}
        <div className="absolute right-0 top-1/2 w-[30%] custom-w-40 transform -translate-y-1/10 pr-20 custom-padding1 z-10 
                        max-lg:static max-lg:transform-none max-lg:w-full max-lg:px-5 max-lg:mt-8 ">
          <CourseCard/>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex gap-8 px-20 lg:mt-20 max-lg:flex-col max-lg:px-5">
  <div className="flex flex-col lg:items-end md:items-center w-[60%] max-lg:w-full"> {/* Added items-end */}
    <div className="w-full max-w-[750px]"> 
      <CourseContent />
      <CourseDetail />
      <InstructorSection />
      <ReviewSection />
    </div>
  </div>
        {/* Right Sidebar (30% width - hidden on mobile as CourseCard is already shown above) */}
        <div className="w-[30%] hidden lg:block"></div>
      </div>

   
   

    
    </>
  )
}

export default coursedetail