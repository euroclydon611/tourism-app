import { useGetBookingsQuery } from "@/redux/features/bookingApi";
import { Edit, Calendar } from "lucide-react";
import { useState } from "react";

const BookingSection = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: bookings } = useGetBookingsQuery({
    page,
    limit,
    search: searchQuery,
    userId: "",
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Guests
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase text-right">
                  Total Price (GHS)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {bookings?.data.length > 0 ? (
                bookings.data.map((booking: any) => (
                  <tr key={booking._id}>
                    {/* Format date as YYYY-MM-DD */}
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(booking.date).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {booking.guests}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right">
                      {booking.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`
                  inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full
                  ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                `}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {booking.notes || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <button
                        // onClick={() => handleEditBooking(booking)}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Edit className="h-5 w-5 text-primary-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">No Bookings Yet</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default BookingSection