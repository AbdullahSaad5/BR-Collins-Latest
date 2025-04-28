export interface IAppointment {
  id: string;
  _id: string;
  courseId: string;
  location: {
    venueName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    additionalInfo?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  date: Date;
  startTime: Date;
  endTime: Date;
  maxParticipants: number;
  price: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "rescheduled";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentCreatePayload = Omit<IAppointment, "id" | "_id" | "status" | "createdAt" | "updatedAt">;

export type AppointmentUpdatePayload = Partial<AppointmentCreatePayload>;
