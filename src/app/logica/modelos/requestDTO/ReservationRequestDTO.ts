export interface ReservationRequestDTO {
  barberId: number;
  clientId: number;
  date: string;
  startTime: string;
  endTime: string;
  Services: string[];
}
