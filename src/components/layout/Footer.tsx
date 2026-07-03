import type { SiteSettings } from "@/types/cms";

interface FooterProps {
  siteSettings: SiteSettings;
}

export function Footer({ siteSettings }: FooterProps) {
  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 md:flex-row">
        <p className="text-xs text-muted-foreground">
          {siteSettings.footerText ||
            `© ${new Date().getFullYear()} ${siteSettings.siteTitle}`}
        </p>
        <a
          href="#hero"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
