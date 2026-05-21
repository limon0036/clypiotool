import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | clypio Utility Hub",
  description: "Read the privacy policy for clypio Utility Hub.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-primary">Privacy Policy</h1>
        <p className="text-muted-foreground leading-relaxed">
          clypio Utility Hub respects your privacy. This policy explains what data may be collected, how it is used,
          and how users can contact us regarding privacy concerns.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Information we may collect</h2>
          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li>Basic technical data such as browser type, device type, and anonymous usage metrics.</li>
            <li>Contact details only when users voluntarily send messages through contact channels.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">How information is used</h2>
          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li>To operate, maintain, and improve website functionality and performance.</li>
            <li>To respond to support or business inquiries.</li>
            <li>To detect abuse, protect service integrity, and ensure platform security.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Data sharing and ads</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell personal information. Third-party services (including analytics or advertising partners)
            may process limited technical data in accordance with their own privacy policies.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Your choices</h2>
          <p className="text-muted-foreground leading-relaxed">
            You may stop using the service at any time. For privacy-related requests, please contact us at
            support@clypio.com.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
