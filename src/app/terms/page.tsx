import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | clypio Utility Hub",
  description: "Read the terms of use for clypio Utility Hub.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-primary">Terms of Use</h1>
        <p className="text-muted-foreground leading-relaxed">
          By accessing or using clypio Utility Hub, you agree to these Terms of Use. If you do not agree, please
          discontinue use of the website.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Acceptable use</h2>
          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li>Use the website only for lawful purposes.</li>
            <li>Do not attempt to interfere with platform security, availability, or performance.</li>
            <li>Do not use automated abuse, spam, or harmful scripts against our services.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Service availability</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update, modify, suspend, or remove features at any time to improve quality or maintain platform
            stability. We do not guarantee uninterrupted availability.
          </p>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Limitation of liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            The tools are provided on an "as is" basis. Users are responsible for how generated outputs are used.
            clypio Utility Hub is not liable for losses resulting from misuse, interpretation errors, or third-party
            dependencies.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
