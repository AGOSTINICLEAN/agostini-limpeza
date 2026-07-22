import { supabase } from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error(error)
    return []
  }

  return data;
}
export async function isTimeAvailable(date: string, time: string) {

  const bookings = await getBookings();

  const [hour, minute] = time.split(":").map(Number);
  const selectedMinutes = hour * 60 + minute;

  return !bookings.some((booking: any) => {
    if (booking.date !== date || booking.status === "cancelled") {
      return false;
    }

    const [bookingHour, bookingMinute] = booking.time
      .split(":")
      .map(Number);

    const bookingMinutes = bookingHour * 60 + bookingMinute;

    return Math.abs(selectedMinutes - bookingMinutes) < 120;
  });
}
export async function getMyBookings(userId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("date")

  if (error) {
    console.error(error)
    return []
  }

  return data
}
export async function saveBooking(booking: {
  client_name: string;
  user_id: string;
  email?: string;
  phone?: string;
  address: string;
  date: string;
  time: string;
  status?: string;
  notes?: string;
}) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        client_name: booking.client_name,
        user_id: booking.user_id,
        email: booking.email ?? null,
        phone: booking.phone ?? null,
        address: booking.address,
        date: booking.date,
        time: booking.time,
        status: booking.status ?? "pending",
        notes: booking.notes ?? null,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function updateBookingStatus(
  id: string,
  status: string
) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function getAvailableTimes(date: string) {
  const times: string[] = [];

  for (let hour = 6; hour <= 22; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 22 && minute === 30) continue;

      const time =
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
          const now = new Date();
const selectedDate = new Date(date + "T00:00:00");

const isToday =
  selectedDate.toDateString() === now.toDateString();

if (isToday) {
  const [h, m] = time.split(":").map(Number);

  const bookingTime = new Date(now);
  bookingTime.setHours(h, m, 0, 0);

  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  if (bookingTime < oneHourLater) {
    continue;
  }
}

      const available = await isTimeAvailable(date, time);

      if (available) {
        times.push(time);
      }
    }
  }

  return times;
}

export async function hasAvailableTimes(date: string) {
  const times = await getAvailableTimes(date);
  return times.length > 0;
}
export async function getBookingById(id: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
export async function deleteBooking(id: string) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
export async function updateBooking(
  booking: {
    id: string;
    client_name: string;
    email?: string;
    phone?: string;
    address: string;
    date: string;
    time: string;
    status?: string;
    notes?: string;
  }
) {
  const { data, error } = await supabase
    .from("bookings")
    .update({
      client_name: booking.client_name,
      email: booking.email ?? null,
      phone: booking.phone ?? null,
      address: booking.address,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      notes: booking.notes ?? null,
    })
    .eq("id", booking.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}