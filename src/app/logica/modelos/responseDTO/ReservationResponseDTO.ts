export interface ReservationResponseDTO {
  id: number;
  barberId: number;
  clientId: number;
  state: string;
  date: string;
  startTime: string;
  endTime: string;
  services: number[];
}
