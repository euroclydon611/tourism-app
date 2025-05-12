import PageLayout from "@/components/layout/PageLayout";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import DestinationSection from "@/components/admin/DestinationSection";

export default function AdminDestinations() {
  const { user } = useSelector((state: RootState) => state.auth) as any;

  return (
    <PageLayout title="Destinations" description="Manage destinations">
      {/* Status and Entity Info */}
      <DestinationSection />
      {/* Personal Details */}
    </PageLayout>
  );
}
