"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import type { PropertyRow, PropertyType } from "@/lib/properties/types";
import type { ActionResult } from "@/lib/admin/actions";
import {
  createPropertyAction,
  updatePropertyAction,
} from "@/lib/admin/actions";
import { uploadPropertyImage } from "@/lib/admin/upload-client";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { slugify } from "@/lib/slugify";

type Props = {
  mode: "create" | "edit";
  property?: PropertyRow;
};

const emptyUnit = { type: "", rental: "", price: "" };

type PendingThumb = { id: string; file: File; preview: string };

export default function PropertyForm({ mode, property }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const action =
    mode === "create"
      ? createPropertyAction
      : updatePropertyAction.bind(null, property!.id);

  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    action,
    {},
  );

  const [title, setTitle] = useState(property?.title ?? "");
  const [slug, setSlug] = useState(property?.slug ?? "");
  const [propertyType, setPropertyType] = useState<PropertyType>(
    property?.property_type ?? "developed",
  );
  const [units, setUnits] = useState(
    property?.units?.length ? property.units : [emptyUnit],
  );

  const [cardFile, setCardFile] = useState<File | null>(null);
  const [cardPreview, setCardPreview] = useState<string | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [pendingThumbs, setPendingThumbs] = useState<PendingThumb[]>([]);
  const [clientError, setClientError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (state.success) {
      router.push("/admin/properties");
      router.refresh();
    }
  }, [state.success, router]);

  useEffect(() => {
    if (property?.units?.length) setUnits(property.units);
  }, [property]);

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setSlug(property.slug);
    }
  }, [property]);

  useEffect(() => {
    if (mode === "create") {
      setSlug(slugify(title));
    }
  }, [title, mode]);

  useEffect(() => {
    return () => {
      if (cardPreview?.startsWith("blob:")) URL.revokeObjectURL(cardPreview);
      if (heroPreview?.startsWith("blob:")) URL.revokeObjectURL(heroPreview);
      pendingThumbs.forEach((t) => URL.revokeObjectURL(t.preview));
    };
  }, [cardPreview, heroPreview, pendingThumbs]);

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

  function handleFileSelect(
    file: File | undefined,
    setFile: (f: File | null) => void,
    setPreview: (url: string | null) => void,
    currentPreview: string | null,
  ) {
    if (!file) return;
    if (currentPreview?.startsWith("blob:")) URL.revokeObjectURL(currentPreview);
    setFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function clearFileSelection(
    setFile: (f: File | null) => void,
    setPreview: (url: string | null) => void,
    currentPreview: string | null,
  ) {
    if (currentPreview?.startsWith("blob:")) URL.revokeObjectURL(currentPreview);
    setFile(null);
    setPreview(null);
  }

  function handleGallerySelect(files: FileList | null) {
    if (!files?.length) return;
    const added: PendingThumb[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setPendingThumbs((prev) => [...prev, ...added]);
  }

  function removePendingThumb(id: string) {
    setPendingThumbs((prev) => {
      const target = prev.find((t) => t.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((t) => t.id !== id);
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setClientError(null);

    if (!isSupabaseConfigured()) {
      setClientError("Supabase is not configured.");
      return;
    }

    if (mode === "create") {
      if (!cardFile) {
        setClientError("Card thumbnail is required.");
        return;
      }
      if (!heroFile) {
        setClientError("Gallery hero image is required.");
        return;
      }
    }

    const folder = slug || slugify(title) || "property";
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setClientError("You must be signed in. Please log in again.");
      return;
    }

    setUploading(true);

    try {
      let card_image_url = property?.card_image_url ?? "";
      if (cardFile) {
        const uploaded = await uploadPropertyImage(supabase, cardFile, folder);
        if (uploaded.error || !uploaded.url) {
          setClientError(
            uploaded.error
              ? `Failed to upload card thumbnail: ${uploaded.error}`
              : "Failed to upload card thumbnail.",
          );
          return;
        }
        card_image_url = uploaded.url;
      }

      let gallery_hero_url = property?.gallery_hero_url ?? "";
      if (heroFile) {
        const uploaded = await uploadPropertyImage(supabase, heroFile, folder);
        if (uploaded.error || !uploaded.url) {
          setClientError(
            uploaded.error
              ? `Failed to upload gallery hero: ${uploaded.error}`
              : "Failed to upload gallery hero.",
          );
          return;
        }
        gallery_hero_url = uploaded.url;
      }

      const gallery_thumbnail_urls = [...(property?.gallery_thumbnail_urls ?? [])];
      for (const thumb of pendingThumbs) {
        const uploaded = await uploadPropertyImage(supabase, thumb.file, folder);
        if (uploaded.error || !uploaded.url) {
          setClientError(
            uploaded.error
              ? `Failed to upload gallery image: ${uploaded.error}`
              : "Failed to upload gallery image.",
          );
          return;
        }
        gallery_thumbnail_urls.push(uploaded.url);
      }

      const fd = new FormData(form);

      fd.set("slug", slug);
      fd.set("property_type", propertyType);
      fd.set("card_image_url", card_image_url);
      fd.set("gallery_hero_url", gallery_hero_url);
      fd.set("gallery_thumbnail_urls", JSON.stringify(gallery_thumbnail_urls));

      formAction(fd);
    } catch (err) {
      setClientError(
        err instanceof Error ? err.message : "Upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  const cardDisplay = cardPreview ?? property?.card_image_url ?? null;
  const heroDisplay = heroPreview ?? property?.gallery_hero_url ?? null;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-8"
    >
      {(clientError || state.error) && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {clientError ?? state.error}
        </p>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Basics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label htmlFor="slug-display" className="mb-1.5 block text-sm font-medium text-slate-700">
              Slug <span className="font-normal text-slate-400">(auto-generated)</span>
            </label>
            <input
              id="slug-display"
              value={slug}
              readOnly
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
            />
            <input type="hidden" name="slug" value={slug} />
          </div>
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
          <ImageUploadField
            label="Card thumbnail"
            required={mode === "create" && !property?.card_image_url}
            hint={
              property?.card_image_url && !cardFile
                ? "Select a new image to replace the current one."
                : undefined
            }
            preview={cardDisplay}
            hasNewSelection={Boolean(cardFile)}
            onSelect={(file) =>
              handleFileSelect(file, setCardFile, setCardPreview, cardPreview)
            }
            onClear={() =>
              clearFileSelection(setCardFile, setCardPreview, cardPreview)
            }
          />
          <ImageUploadField
            label="Gallery hero"
            required={mode === "create" && !property?.gallery_hero_url}
            hint={
              property?.gallery_hero_url && !heroFile
                ? "Select a new image to replace the current one."
                : undefined
            }
            preview={heroDisplay}
            hasNewSelection={Boolean(heroFile)}
            onSelect={(file) =>
              handleFileSelect(file, setHeroFile, setHeroPreview, heroPreview)
            }
            onClear={() =>
              clearFileSelection(setHeroFile, setHeroPreview, heroPreview)
            }
          />
          <div className="sm:col-span-2">
            <GalleryThumbnailsField
              existing={property?.gallery_thumbnail_urls ?? []}
              pending={pendingThumbs}
              onSelect={handleGallerySelect}
              onRemovePending={removePendingThumb}
            />
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
        <p className="mt-1 text-sm text-slate-500">
          Only published properties appear on the public website.
        </p>
        <div className="mt-4 space-y-4">
          <Checkbox
            label="Published (visible on website)"
            name="published"
            defaultChecked={mode === "create" ? true : property?.published}
          />
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
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending || uploading}
          className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {uploading
            ? "Uploading images…"
            : pending
              ? "Saving…"
              : mode === "create"
                ? "Create property"
                : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function ImagePreview({
  src,
  alt,
  onClear,
}: {
  src: string;
  alt: string;
  onClear: () => void;
}) {
  return (
    <div className="relative mt-3 inline-block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-32 w-44 rounded-lg border border-slate-200 object-cover"
      />
      <button
        type="button"
        onClick={onClear}
        aria-label="Remove selected image"
        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-md hover:bg-red-600"
      >
        ×
      </button>
    </div>
  );
}

function ImageUploadField({
  label,
  hint,
  preview,
  hasNewSelection,
  required,
  onSelect,
  onClear,
}: {
  label: string;
  hint?: string;
  preview: string | null;
  hasNewSelection: boolean;
  required?: boolean;
  onSelect: (file: File | undefined) => void;
  onClear: () => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    onClear();
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        onChange={(e) => onSelect(e.target.files?.[0])}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      {preview ? (
        hasNewSelection ? (
          <ImagePreview src={preview} alt={label} onClear={handleClear} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt={label}
            className="mt-3 h-32 w-44 rounded-lg border border-slate-200 object-cover"
          />
        )
      ) : null}
    </div>
  );
}

function GalleryThumbnailsField({
  existing,
  pending,
  onSelect,
  onRemovePending,
}: {
  existing: string[];
  pending: PendingThumb[];
  onSelect: (files: FileList | null) => void;
  onRemovePending: (id: string) => void;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
        Additional gallery images
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          onSelect(e.target.files);
          if (inputRef.current) inputRef.current.value = "";
        }}
        className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
      <div className="mt-3 flex flex-wrap gap-3">
        {existing.map((url) => (
          <div key={url} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-24 w-32 rounded-lg border border-slate-200 object-cover" />
            <span className="absolute -right-1 -top-1 rounded-full bg-slate-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
              saved
            </span>
          </div>
        ))}
        {pending.map((thumb) => (
          <div key={thumb.id} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb.preview}
              alt=""
              className="h-24 w-32 rounded-lg border border-brand/30 object-cover"
            />
            <button
              type="button"
              onClick={() => onRemovePending(thumb.id)}
              aria-label="Remove selected image"
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-md hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
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
