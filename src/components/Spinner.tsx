import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
};

function Spinner({
  className,
  width = 64,
  height = 64,
  color = "#ffffff",
}: Props) {
  return (
    <svg
      className={cn(className, "spinner")}
      fill={color}
      width={`${width}px`}
      height={`${height}px`}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>spinner-one-third</title>{" "}
        <path d="M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z"></path>{" "}
      </g>
    </svg>
  );
}

export default Spinner;
