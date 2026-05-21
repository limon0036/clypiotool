import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | clypio Utility Hub",
  description: "Learn about clypio Utility Hub and our mission.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-primary">About clypio Utility Hub</h1>
        <p className="text-muted-foreground leading-relaxed">
          clypio Utility Hub is an independent web platform that provides free and practical online tools for everyday
          digital tasks. Our mission is to make essential utilities accessible in one place with a clean interface,
          reliable performance, and a user-first experience.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We continuously improve quality, usability, and security standards so students, professionals, freelancers,
          and creators can complete routine tasks faster without switching across multiple websites.
        </p>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">What we provide</h2>
          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li>Useful browser-based tools for productivity and day-to-day workflows.</li>
            <li>Simple, responsive pages optimized for mobile and desktop users.</li>
            <li>Regular updates to improve performance, stability, and user experience.</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Transparency</h2>
          <p className="text-muted-foreground leading-relaxed">
            We maintain dedicated pages for Contact, Terms, and Privacy Policy to ensure users clearly understand how
            the service works and how information is handled.
          </p>
        </div>
      </div>
    </div>
  );
}
