import Link from "next/link";
import { NavItemType } from "./Header";
import { ContactIcons } from "@/components/molecules/ContactIcons";
import { ExternalLink } from "@/components/atoms/ExternalLink";

interface HeaderDesktopProps {
    navItems: NavItemType[];
}

export const HeaderDesktop = ({ navItems }: HeaderDesktopProps) => {
    return (
        <nav className="hidden lg:flex flex-1 flex-row justify-between items-center">
            <ContactIcons size={24} />

            <ul className="flex flex-1 flex-row uppercase justify-end py-8 gap-3 md:gap-10 tracking-widest text-sm md:text-lg">
                {navItems.map(({ label, page, link }) => {
                    const isCurrentPage = false;

                    return (
                        <li key={label}>
                            {page ? (
                                <Link
                                    href={page}
                                    className={isCurrentPage ? "bg-transparent text-primary font-bold" : undefined}>
                                    {label}
                                </Link>
                            ) : (
                                <ExternalLink href={link}>{label}</ExternalLink>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
