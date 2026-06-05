import Link from "next/link";
import AdminShell from "../components/AdminShell";
import { publishPropertyAction } from "@/lib/admin/actions";
import { getAllPropertiesAdmin } from "@/lib/properties/fetch";

export default async function AdminPropertiesPage() {
  const properties = await getAllPropertiesAdmin();

  return (
    <AdminShell title="Properties">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          {properties.length} propert{properties.length === 1 ? "y" : "ies"}
        </p>
        <Link
          href="/admin/properties/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Add property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">No properties yet.</p>
          <Link
            href="/admin/properties/new"
            className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
          >
            Create your first property
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {property.title}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">
                    {property.property_type}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        property.published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600",
                      ].join(" ")}
                    >
                      {property.published ? "Published" : "Draft"}
                    </span>
                    {property.featured ? (
                      <span className="ml-2 inline-flex rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                        Featured
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(property.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {!property.published ? (
                        <form action={publishPropertyAction.bind(null, property.id)}>
                          <button
                            type="submit"
                            className="font-medium text-emerald-700 hover:underline"
                          >
                            Publish
                          </button>
                        </form>
                      ) : null}
                      <Link
                        href={`/admin/properties/${property.id}`}
                        className="font-medium text-brand hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
