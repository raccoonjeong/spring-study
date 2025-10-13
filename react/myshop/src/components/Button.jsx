import clsx from "clsx";

export default function Button({
  icon,
  primary,
  full,
  size = "md",
  children,
  ...rest
}) {
  return (
    <button
      className={clsx(
        "cursor-pointer border border-[#0063ba] font-semibold flex items-center",
        primary ? "bg-[#0063ba] text-white" : "text-[#0063ba] bg-white",
        full ? "block w-full" : "",
        size === "lg"
          ? "px-4 h-[60px] text-lg justify-center"
          : "px-4 h-[38px] text-sm "
      )}
      {...rest}
    >
      {icon && <div>{icon}</div>}
      <div>{children}</div>
    </button>
  );
}
