"use client";

import { AboutSection } from "@/components/organisms/AboutSection";
import LandingSection from "@/components/organisms/LandingSection/LandingSection";
import { TechnologiesSection } from "@/components/organisms/TechnologiesSection";
import { useEffect, useState } from "react";

export default function Home() {
    const [isLandingUnlock, setIsLandingUnlock] = useState(false);
    // const { isMobile } = useWindowSize()

    const saveIsLandingUnlock = (value: boolean) => {
        localStorage.setItem("isLandingUnlock", value.toString());
        setIsLandingUnlock(value);
    };

    useEffect(() => {
        const storedValue = localStorage.getItem("isLandingUnlock");
        if (storedValue) {
            setIsLandingUnlock(storedValue === "true");
        }
    }, []);

    return (
        <div className="">
            <LandingSection
                isLandingUnlock={isLandingUnlock}
                setIsLandingUnlock={saveIsLandingUnlock}
            />

            {/* {isLandingUnlock || isMobile ? ( */}
            <div className="container mx-auto px-4 flex flex-col gap-8">
                <AboutSection />
                <TechnologiesSection />
            </div>
        </div>
    );
}
