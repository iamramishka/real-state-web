declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    absoluteStrokeWidth?: boolean;
    size?: number | string;
    strokeWidth?: number | string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;

  export const Activity: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const Menu: LucideIcon;
  export const Mic: LucideIcon;
  export const Plus: LucideIcon;
  export const X: LucideIcon;
}
