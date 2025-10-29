import { redirect } from "next/navigation";

export default async function UpdateDashboard() {
  // Redirect directly to Sanity Studio
  // All content management is handled through Sanity Studio
  redirect("/studio");
}
