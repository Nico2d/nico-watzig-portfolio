import { contactsData } from "@/constants/contact";
import { ExternalLink } from "../atoms/ExternalLink";

export const ContactIcons = ({ size = 32, className = "" }) => {
    return (
        <div className={`flex flex-row gap-4 md:gap-8 ${className}`}>
            {contactsData.map(({ Comp, link, alt }) => {
                return (
                    <ExternalLink key={link} href={link} aria-label={alt}>
                        <Comp height={size} fill="#ffffff" />
                    </ExternalLink>
                );
            })}
        </div>
    );
};
