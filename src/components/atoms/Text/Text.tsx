interface TextProps {
    text?: string;
    variant: "body" | "heading" | "subHeading";
    color?: string;
    weight?: "normal" | "semibold";
    italic?: boolean;
    size?: "small" | "base" | "large" | "xl" | "2xl";
    css?: string;
}

const sizes = {
    small: "text-sm",
    base: "text-base",
    large: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
};

const sizesH = {
    small: "text-2xl",
    base: "text-3xl",
    large: "text-4xl",
    xl: "text-6xl",
    "2xl": "text-7xl",
};

const Text = ({
    text,
    variant,
    color,
    weight,
    italic = false,
    size = "base",
}: TextProps) => {
    return variant ? (
        variant === "heading" ? (
            <h1
                className={`${sizesH[size]} ${weight && "font-" + weight} ${
                    italic && "italic"
                } ${color}`}
            >
                {text}
            </h1>
        ) : variant === "subHeading" ? (
            <h2
                className={`${sizesH[size]} ${weight && "font-" + weight} ${
                    italic && "italic"
                } ${color}`}
            >
                {text}
            </h2>
        ) : (
            <p
                className={`${sizes[size]} ${weight && "font-" + weight} ${
                    italic && "italic"
                } ${color}`}
            >
                {text}
            </p>
        )
    ) : (
        <span className="text-red-400">
            <b>Error:</b> add text variant <i>(body, heading or subHeading)</i>
        </span>
    );
};

export default Text;
