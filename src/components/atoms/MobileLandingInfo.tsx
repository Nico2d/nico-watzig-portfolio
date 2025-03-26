import styles from "./MobileLandingInfo.module.css";

export const MobileLandingInfo = () => {
    return (
        <div
            className={`mobile-landing-info flex lg:hidden absolute bottom-0 left-0 right-0 h-1/4 bg-landing-lock-left-bg text-white justify-between items-center z-30 ${styles.shape}`}>
            <div className="container mx-auto px-4">
                <p className="text-base">Hi, I am</p>
                <p className="text-3xl font-bold text-primary">Nico Wätzig</p>
                <p className="text-xs font-extrabold tracking-widest">Frontend Developer</p>
            </div>
        </div>
    );
};
