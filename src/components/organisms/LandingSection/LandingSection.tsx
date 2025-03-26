"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import { LandingMobile } from "./LandingMobile";
import { LandingDesktop } from "./LandingDesktop";

export interface LandingSectionProps {
    isLandingUnlock: boolean;
    setIsLandingUnlock: (value: boolean) => void;
}

export default function LandingSection({
    isLandingUnlock,
    setIsLandingUnlock,
}: LandingSectionProps) {
    const { isLoading, resolution, isDesktop, isMobile } = useWindowSize();

    console.log(isLoading, resolution);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            {isDesktop ? (
                <LandingDesktop
                    isLandingUnlock={isLandingUnlock}
                    setIsLandingUnlock={setIsLandingUnlock}
                />
            ) : (
                <LandingMobile />
            )}
        </>
    );
}
