"use client";

import { exit, initial, transition, animate } from "@/utils/motions";
import { LazyMotion, domAnimation, m } from "motion/react";

export function HeadingDivider({ title = "" }) {
    return (
        <header className="flex items-center">
            <LazyMotion features={domAnimation}>
                <m.h2
                    tabIndex={0}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    className="flex items-center font-extrabold text-3xl md:text-4xl relative w-full uppercase gap-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-50 after:h-[1px] after:flex-1 after:bg-inherited text-brand-dark dark:text-brand-light">
                    {title}
                </m.h2>
            </LazyMotion>
        </header>
    );
}
