import { preloadModule } from "react-dom";

export { metadata, viewport } from "next-sanity/studio";

const bridgeScript = "https://core.sanity-cdn.com/bridge.js";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  preloadModule(bridgeScript, { as: "script" });

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <script src={bridgeScript} async type="module" />
        {children}
      </body>
    </html>
  );
}
