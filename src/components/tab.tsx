import { ComponentProps } from "react";
import { cn } from "../lib/cn";

export default function Tab(props: ComponentProps<"button"> & { isActive?: boolean }) {
    const { isActive, children, className, ...rest } = props
    return (
        <button className={cn("p-2 cursor-pointer", isActive && "border-b-2 border-purple-800", className)} {...rest}>
            {children}
        </button>
    )
}