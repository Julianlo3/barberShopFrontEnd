import {ScheduleResponseDTO} from "./ScheduleResponseDTO";

export interface BarberResponseDTO {
   id: number;
   name: string;
   phone: string;
   email: string;
   available: boolean;
   schedule: ScheduleResponseDTO ;
}
