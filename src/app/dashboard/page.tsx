import Dashboard from "@/components/dashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  return <Dashboard />;
};

export default DashboardPage;
