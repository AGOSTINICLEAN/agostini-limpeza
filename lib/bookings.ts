export interface Booking {
  id: string;
  clientName: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const STORAGE_KEY = 'bookings';

export function getBookings(): Booking[] {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveBooking(booking: Booking) {
  const bookings = getBookings();

  bookings.push(booking);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}
export function isTimeAvailable(date: string, time: string) {
  const bookings = getBookings();

  const [hour, minute] = time.split(":").map(Number);
  const selectedMinutes = hour * 60 + minute;

  return !bookings.some((booking) => {
    if (booking.date !== date || booking.status === "cancelled") {
      return false;
    }

    const [bookingHour, bookingMinute] = booking.time.split(":").map(Number);
    const bookingMinutes = bookingHour * 60 + bookingMinute;

    return Math.abs(selectedMinutes - bookingMinutes) < 120;
  });
}

export function updateBooking(updatedBooking: Booking) {
  const bookings = getBookings().map((booking) =>
    booking.id === updatedBooking.id ? updatedBooking : booking
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function deleteBooking(id: string) {
  const bookings = getBookings().filter((booking) => booking.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function getBookingById(id: string) {
  return getBookings().find((booking) => booking.id === id);
}
export function getAvailableTimes(date: string): string[] {
  const times: string[] = [];

  for (let hour = 6; hour <= 22; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 22 && minute === 30) continue;

      const time =
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

      if (isTimeAvailable(date, time)) {
        times.push(time);
      }
    }
  }

  return times;
}

export function hasAvailableTimes(date: string): boolean {
  return getAvailableTimes(date).length > 0;
}
export function updateBookingStatus(
  id: string,
  status: Booking["status"]
) {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) =>
    booking.id === id
      ? { ...booking, status }
      : booking
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedBookings)
  );
}