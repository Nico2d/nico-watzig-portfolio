import { useRef } from "react";
import { useInView, LazyMotion, domAnimation } from "motion/react";
import { Introduction } from "../atoms/Introduction";
import { WorkArea } from "../atoms/WorkArea";
import { ProjectButton } from "../atoms/ProjectButton";

export function IntroductionSection() {
    const viewRef = useRef(null);
    const isInView = useInView(viewRef, { once: true });

    return (
        <LazyMotion features={domAnimation}>
            <section id="intro">
                <Introduction isInView={isInView} viewRef={viewRef} />
                <WorkArea isInView={isInView} viewRef={viewRef} />
                <ProjectButton isInView={isInView} viewRef={viewRef} />
            </section>
        </LazyMotion>
    );
}
