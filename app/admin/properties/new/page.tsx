import AdminShell from "../../components/AdminShell";
import PropertyForm from "../../components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <AdminShell title="New property">
      <PropertyForm mode="create" />
    </AdminShell>
  );
}
