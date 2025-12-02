import {ScheduleRequestDTO} from "./scheduleRequestDTO";

export interface BarberRequestDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
  schedule: ScheduleRequestDTO;
}
