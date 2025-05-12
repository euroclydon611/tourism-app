import PageLayout from "@/components/layout/PageLayout";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import BookingSection from "@/components/admin/BookingSection";

export default function AdminBookings() {
  const { user } = useSelector((state: RootState) => state.auth) as any;

  return (
    <PageLayout title="Bookings" description="Manage bookings">
      <BookingSection />
    </PageLayout>
  );
}
