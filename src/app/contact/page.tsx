import { ContactForm } from "@/components/molecules/forms/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Nico Wätzig",
    description:
        "Welcome to my website, where you may discover information about me, the technologies and projects on which I work.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 space-y-8 mt-24 lg:mt-48">
            <ContactForm />
        </div>
    );
}
