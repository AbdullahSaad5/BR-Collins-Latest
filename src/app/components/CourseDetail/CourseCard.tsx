import { Send, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const socialIcons = [
  { Icon: Facebook },
  { Icon: Twitter },
  { Icon: Linkedin },
  { Icon: Instagram },
];

export const CourseCard = () => {
  
  const details = [
    { label: "Start Date", value: "5 Hrs 20 Min" },
    { label: "Enrolled", value: "100" },
    { label: "Lectures", value: "50" },
    { label: "Skill Level", value: "Basic" },
    { label: "Language", value: "English" },
    { label: "Quizzes", value: "10" },
    { label: "Certificate", value: "Yes" },
  ];

  return (
    <aside className="grow w-full pt-8 pb-px bg-white rounded-3xl border border-slate-200 shadow-[0px_4px_75px_rgba(0,0,0,0.06)] max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col items-start px-8 max-md:px-5 w-full">
        {/* Course Preview */}
        <div className="relative w-full min-h-[280px] text-xl font-bold text-white rounded-2xl shadow-[0px_4px_75px_rgba(0,0,0,0.06)] overflow-hidden text-center max-md:max-w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6004ff96931b8b12036a53540395eea0df3614a?placeholderIfAbsent=true&apiKey=5551d33fb4bb4e9e906ff9c9a5d07fe5"
            alt="Course preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button className="relative pt-56 pb-6 px-16 max-md:pt-24 max-md:px-5 w-full">
            Preview this course
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-8 font-extrabold text-center text-neutral-900">
          <span className="text-3xl leading-none">$149.00</span>
          <span className="text-xl leading-tight line-through text-neutral-400">$155.00</span>
          <span className="px-3 py-1.5 text-base text-black uppercase bg-orange-300 rounded-md">86% off</span>
        </div>

        {/* Course Modes */}
        <div className="mt-8 w-full text-center max-md:max-w-full">
          <div className="text-white font-semibold text-xl space-y-3 max-md:max-w-full">
            <button className="w-full min-h-[58px] bg-orange-500 rounded-[58px]">e-learning</button>
            <button className="w-full min-h-[58px] bg-sky-500 rounded-[58px]">in-person</button>
          </div>
          <p className="mt-5 text-base font-medium text-neutral-400">30-Day Money-Back Guarantee</p>
        </div>

        {/* Details Table */}
        <div className="flex flex-wrap gap-9 mt-12 text-lg text-neutral-900 w-full max-md:mt-10">
          <div className="overflow-hidden grow shrink-0 basis-0 w-fit h-[318px] max-md:max-w-full">
            {details.map((item, index) => (
              <div key={item.label}>
                <div className="flex justify-between items-center w-full">
                  <span>{item.label}</span>
                  <span className="font-semibold text-right">{item.value}</span>
                </div>
                {index < details.length - 1 && (
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
    </aside>
  );
};
