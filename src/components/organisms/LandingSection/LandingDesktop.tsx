"use client";

import { HelloTextAnimation } from "@/components/atoms/HelloTextAnimation";
import { BlackBox } from "@/components/molecules/BlackBox";
import { IntroductionSection } from "@/components/molecules/IntroductionSection";
import { ParallaxHero } from "@/components/molecules/ParallaxHero/ParallaxHero";
import { LandingSectionProps } from "./LandingSection";
import { useParallaxFocus } from "@/hooks/useParallaxFocus";

export const LandingDesktop = ({ isLandingUnlock, setIsLandingUnlock }: LandingSectionProps) => {
    const { boundingClientRect } = useParallaxFocus();

    return (
        <>
            <div className="h-screen"></div>

            <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-landing-lock-right-bg">
                <div
                    className={`absolute left-0 top-0 right-1/2 bottom-0 bg-landing-lock-left-bg left-section left-side-polygon z-[1]`}
                />
                <div className="relative container mx-auto px-4 h-screen z-10">
                    <HelloTextAnimation />
                </div>

                <div
                    className="absolute left-0 right-0 top-0 bottom-0 translate-x-[25%]"
                    style={{
                        zIndex: isLandingUnlock ? 21 : 0,
                    }}>
                    <ParallaxHero isLocked={isLandingUnlock} />
                </div>

                <BlackBox
                    isLandingUnlock={isLandingUnlock}
                    onClick={() => setIsLandingUnlock(!isLandingUnlock)}
                    boundingClientRect={{
                        bottom: 100,
                        height: 100,
                        left: 100,
                        right: 100,
                        top: 100,
                        width: 100,
                        toJSON: () => {},
                        x: 100,
                        y: 100,
                    }}
                />
            </div>

            {isLandingUnlock && (
                <div className="container mx-auto px-4">
                    <div className="absolute top-1/2 -translate-y-1/2 z-40">
                        <IntroductionSection />
                    </div>
                </div>
            )}
        </>
    );
};
