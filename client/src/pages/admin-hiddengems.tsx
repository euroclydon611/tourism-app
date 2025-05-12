import PageLayout from "@/components/layout/PageLayout";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import DestinationSection from "@/components/admin/DestinationSection";
import HiddenGemsSection from "@/components/admin/HiddengemsSection";

export default function AdminHiddengems() {
  const { user } = useSelector((state: RootState) => state.auth) as any;

  return (
    <PageLayout title="Hidden Gems" description="Manage hidden gems">
      {/* Status and Entity Info */}
      <HiddenGemsSection />
      {/* Personal Details */}
    </PageLayout>
  );
}
