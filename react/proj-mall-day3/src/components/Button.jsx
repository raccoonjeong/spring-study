import clsx from "clsx";

export default function Button({
  icon,
  primary,
  full,
  disabled,
  size = "md",
  children,
  ...rest
}) {
  return (
    <button
      isDisabled={disabled}
      className={clsx(
        "cursor-pointer border border-[#0063ba] font-semibold flex items-center",
        primary ? "bg-[#0063ba] text-white" : "text-[#0063ba] bg-white",
        disabled &&
          "!bg-gray-200 border-gray-200 text-gray-400 !cursor-not-allowed",
        full ? "flex w-full justify-center" : "",
        size === "lg" ? "px-6 h-[60px] text-lg" : "px-4 h-[38px] text-sm "
      )}
      {...rest}
    >
      {icon && <div>{icon}</div>}
      <div>{children}</div>
    </button>
  );
}
