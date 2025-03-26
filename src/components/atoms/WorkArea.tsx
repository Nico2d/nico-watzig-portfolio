import { useEffect, useState } from "react";
import { TextElement } from "./TextElement";

export const WorkArea = ({ isInView, viewRef }) => {
    const [text] = useState([
        "convert design into modern UI.",
        "bring flexibility and expertise from years of freelancing.",
        "specialize in responsive, interactive React applications.",
        "craft custom WordPress websites for your needs.",
        "adapt to diverse tools for optimal solutions.",
        "specialize in OTT platform development.",
        "develop maintainable software with clean code principles.",
        "am an Agile Software Developer.",
    ]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 1);

            if (count === text.length - 1) {
                setCount(0);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className="mt-3 relative flex flex-col overflow-hidden">
            <p
                ref={viewRef}
                className="text-[17px] md:text-base transform-none opacity-100"
                style={{
                    transform: isInView ? "none" : "translateX(-200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                }}>
                I
                <span
                    className="absolute flex flex-col transition-all duration-500 ease-in-expo"
                    style={{
                        top: count === 0 ? "0" : `-${count}00%`,
                        left: "10px",
                    }}>
                    {text.map((element) => (
                        <TextElement key={element} element={element} />
                    ))}
                </span>
            </p>
        </div>
    );
};
