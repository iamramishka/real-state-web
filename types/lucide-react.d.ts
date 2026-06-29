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
  export const Bath: LucideIcon;
  export const BedDouble: LucideIcon;
  export const List: LucideIcon;
  export const Map: LucideIcon;
  export const Menu: LucideIcon;
  export const Mic: LucideIcon;
  export const MapPin: LucideIcon;
  export const Plus: LucideIcon;
  export const Ruler: LucideIcon;
  export const Star: LucideIcon;
  export const X: LucideIcon;
}
