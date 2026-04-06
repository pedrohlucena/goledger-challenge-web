import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { getSession } from "@/lib/session";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
