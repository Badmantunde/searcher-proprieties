"use client";

import { useActionState, useEffect, useState } from "react";
import type { PropertyRow, PropertyType } from "@/lib/properties/types";
import type { ActionResult } from "@/lib/admin/actions";
import {
  createPropertyAction,
  updatePropertyAction,
} from "@/lib/admin/actions";

type Props = {
  mode: "create" | "edit";
  property?: PropertyRow;
};

const emptyUnit = { type: "", rental: "", price: "" };

export default function PropertyForm({ mode, property }: Props) {
  const action =
    mode === "create"
      ? createPropertyAction
      : updatePropertyAction.bind(null, property!.id);

  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    action,
    {},
  );

  const [propertyType, setPropertyType] = useState<PropertyType>(
    property?.property_type ?? "developed",
  );
  const [units, setUnits] = useState(
    property?.units?.length ? property.units : [emptyUnit],
  );

  useEffect(() => {
    if (property?.units?.length) setUnits(property.units);
  }, [property]);

  function updateUnit(index: number, field: keyof typeof emptyUnit, value: string) {
    setUnits((prev) =>
      prev.map((unit, i) => (i === index ? { ...unit, [field]: value } : unit)),
    );
  }

  function addUnit() {
    setUnits((prev) => [...prev, { ...emptyUnit }]);
  }

  function removeUnit(index: number) {
    setUnits((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Basics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={property?.title} required />
          <Field label="Slug" name="slug" defaultValue={property?.slug} required />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Property type
            </label>
            <select
              name="property_type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            >
              <option value="developed">Developed property</option>
              <option value="developing">Developing project</option>
            </select>
          </div>
          <Field
            label="Location"
            name="location"
            defaultValue={property?.location}
            className="sm:col-span-2"
            required
          />
          <TextArea
            label="Short description (card)"
            name="description"
            defaultValue={property?.description}
            className="sm:col-span-2"
            required
          />
          <TextArea
            label="Full description (detail page)"
            name="long_description"
            defaultValue={property?.long_description}
            rows={5}
            className="sm:col-span-2"
            required
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Images</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FileField
            label="Card thumbnail"
            name="card_image"
            hint={property?.card_image_url ? "Leave empty to keep current image." : undefined}
            preview={property?.card_image_url}
          />
          <FileField
            label="Gallery hero"
            name="gallery_hero"
            hint={property?.gallery_hero_url ? "Leave empty to keep current image." : undefined}
            preview={property?.gallery_hero_url}
          />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Additional gallery images
            </label>
            <input
              type="file"
              name="gallery_thumbnails"
              accept="image/*"
              multiple
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            {property?.gallery_thumbnail_urls?.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {property.gallery_thumbnail_urls.map((url) => (
                  <li key={url}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-16 w-24 rounded-lg object-cover" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      {propertyType === "developed" ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Developed details</h2>
          <div className="mt-4 grid gap-4">
            <Field
              label="Price range"
              name="price_range"
              defaultValue={property?.price_range ?? ""}
              required
            />
            <TextArea
              label="Amenities (one per line)"
              name="amenities"
              defaultValue={property?.amenities?.join("\n") ?? ""}
              rows={4}
            />
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Developing details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Lease label"
              name="lease_label"
              defaultValue={property?.lease_label ?? ""}
            />
            <Field
              label="Completion date"
              name="completion"
              defaultValue={property?.completion ?? ""}
            />
            <Field
              label="Progress (%)"
              name="progress"
              type="number"
              min={0}
              max={100}
              defaultValue={property?.progress?.toString() ?? ""}
            />
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Unit options</h3>
              <button
                type="button"
                onClick={addUnit}
                className="text-sm font-medium text-brand hover:underline"
              >
                + Add unit
              </button>
            </div>
            {units.map((unit, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-3"
              >
                <input
                  placeholder="Unit type"
                  value={unit.type}
                  onChange={(e) => updateUnit(index, "type", e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Rental label"
                  value={unit.rental}
                  onChange={(e) => updateUnit(index, "rental", e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="Price"
                    value={unit.price}
                    onChange={(e) => updateUnit(index, "price", e.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  {units.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUnit(index)}
                      className="rounded-lg border border-slate-300 px-3 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <input type="hidden" name="units" value={JSON.stringify(units)} />
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Homepage & publishing</h2>
        <div className="mt-4 space-y-4">
          <Checkbox
            label="Show on homepage featured section"
            name="featured"
            defaultChecked={property?.featured}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Featured primary badge"
              name="featured_primary_badge"
              defaultValue={property?.featured_primary_badge ?? ""}
            />
            <Field
              label="Featured secondary badge"
              name="featured_secondary_badge"
              defaultValue={property?.featured_secondary_badge ?? ""}
            />
          </div>
          <Checkbox label="Published (visible on website)" name="published" defaultChecked={property?.published} />
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : mode === "create" ? "Create property" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  className,
  type = "text",
  min,
  max,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  type?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        min={min}
        max={max}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  required,
  className,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
  rows?: number;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function FileField({
  label,
  name,
  hint,
  preview,
}: {
  label: string;
  name: string;
  hint?: string;
  preview?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="" className="mt-3 h-24 w-36 rounded-lg object-cover" />
      ) : null}
    </div>
  );
}

function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-slate-300 text-brand"
      />
      {label}
    </label>
  );
}
