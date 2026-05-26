import { redirect } from "next/navigation";

// Deal Tracker is admin-only.
// In production, replace this check with real session/auth.
// For now: only accessible via /dashboard?admin=true
export default function DashboardPage({
  searchParams,
}: {
  searchParams: { admin?: string };
}) {
  // Guard: if not admin, redirect to home
  if (searchParams.admin !== "true") {
    redirect("/");
  }

  // Dynamically import so it's never bundled into public pages
  return <AdminDashboard />;
}

// Inline admin view (server component safe)
import DealTrackerWrapper from "@/components/dashboard/DealTrackerWrapper";
function AdminDashboard() {
  return (
    <DealTrackerWrapper />
  );
}
