import { useInView } from "motion/react";
import { useRef } from "react";

export const TextElement = ({ element }) => {
    const firstWord = <b>{element.split(" ").at(0)}</b>;
    const restWords = element.split(" ").slice(1).join(" ");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <span
            tabIndex={0}
            ref={ref}
            className="whitespace-nowrap"
            style={{
                transform: isInView ? "none" : "translateX(-200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}>
            {firstWord} {restWords}
        </span>
    );
};
