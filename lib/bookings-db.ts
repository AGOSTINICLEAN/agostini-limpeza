import { supabase } from "./supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;

  return data;
}
export async function saveBooking(booking: {
  client_name: string;
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