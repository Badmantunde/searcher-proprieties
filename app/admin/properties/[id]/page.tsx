import { notFound } from "next/navigation";
import AdminShell from "../../components/AdminShell";
import PropertyForm from "../../components/PropertyForm";
import DeletePropertyButton from "../../components/DeletePropertyButton";
import { getPropertyByIdAdmin } from "@/lib/properties/fetch";

type Props = { params: Promise<{ id: string }> };

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyByIdAdmin(id);
  if (!property) notFound();

  return (
    <AdminShell title={`Edit: ${property.title}`}>
      <div className="mb-6 flex justify-end">
        <DeletePropertyButton id={property.id} title={property.title} />
      </div>
      <PropertyForm mode="edit" property={property} />
    </AdminShell>
  );
}
