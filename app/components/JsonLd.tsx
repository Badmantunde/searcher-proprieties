type JsonLdValue = Record<string, unknown>;

type Props = {
  data: JsonLdValue | JsonLdValue[];
};

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
