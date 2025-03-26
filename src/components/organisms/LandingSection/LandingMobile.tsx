import { MobileLandingInfo } from "@/components/atoms/MobileLandingInfo";
import { ParallaxHero } from "@/components/molecules/ParallaxHero/ParallaxHero";

export const LandingMobile = () => {
    return (
        <>
            <div className="h-screen"></div>

            <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-landing-lock-right-bg">
                <ParallaxHero isLocked={false} />
                <MobileLandingInfo />
            </div>
        </>
    );
};
