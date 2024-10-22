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
    <div className={cn("spinner", className)} style={{ color }}>
      <div style={{ width: `${width}px`, height: `${height}px` }}></div>
      <div style={{ width: `${width}px`, height: `${height}px` }}></div>
      <div style={{ width: `${width}px`, height: `${height}px` }}></div>
      <div style={{ width: `${width}px`, height: `${height}px` }}></div>
    </div>
  );
}

export default Spinner;
