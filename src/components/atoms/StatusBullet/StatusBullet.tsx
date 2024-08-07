interface StatusBulletProps {
    status: "success" | "warning" | "error" | "disabled";
    size: "small" | "medium" | "large";
    text?: string;
    className?: string;
    onClick?: () => void;
}

const variants = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    disabled: "bg-gray-500",
};

const sizes = {
    small: "h-2 w-2",
    medium: "h-4 w-4",
    large: "h-6 w-6",
};

const StatusBullet = ({
    status,
    text,
    size,
    className,
    onClick,
}: StatusBulletProps) => (
    <div
        className="flex items-center justify-around gap-3 rounded-full border-2 border-gray-200 px-3 py-[0.35rem]"
        onClick={onClick}
    >
        <span
            className={`inline-block ${sizes[size]} rounded-full ${variants[status]} ${className}`}
        ></span>
        <span className="text-sm">{text}</span>
    </div>
);

export default StatusBullet;
