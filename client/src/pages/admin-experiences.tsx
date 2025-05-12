import PageLayout from "@/components/layout/PageLayout";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import ExperienceSection from "@/components/admin/ExperienceSection";

export default function AdminExperiences() {
  const { user } = useSelector((state: RootState) => state.auth) as any;

  return (
    <PageLayout title="Experiences" description="Manage experiences">
      <ExperienceSection />
    </PageLayout>
  );
}
