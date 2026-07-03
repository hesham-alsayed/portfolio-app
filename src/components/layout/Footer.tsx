import type { SiteSettings } from "@/types/cms";

interface FooterProps {
  siteSettings: SiteSettings | null;
}

export function Footer({ siteSettings }: FooterProps) {
  if (!siteSettings?.footerText) return null;

  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted">
        <p>{siteSettings.footerText}</p>
      </div>
    </footer>
  );
}
