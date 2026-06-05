"use client";

import { deletePropertyAction } from "@/lib/admin/actions";

export default function DeletePropertyButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <form
      action={deletePropertyAction.bind(null, id)}
      onSubmit={(e) => {
        if (
          !confirm(
            `Delete "${title}"? This cannot be undone.`,
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Delete property
      </button>
    </form>
  );
}
