import { redirect } from "next/navigation";

export default function PartnerLoginRedirect() {
    redirect("/partner?auth=login");
}
