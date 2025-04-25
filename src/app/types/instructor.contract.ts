export interface IInstructor {
  id: string;
  userId: string;
  bio: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  totalCourses: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInstructorStatics {
  getInstructorByUserId: (userId: string) => Promise<IInstructor | null>;
}

export type InstructorCreatePayload = Omit<
  IInstructor,
  "id" | "rating" | "totalStudents" | "totalCourses" | "createdAt" | "updatedAt"
>;

export type InstructorUpdatePayload = Partial<InstructorCreatePayload>;
