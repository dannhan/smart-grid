import type { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type HeaderProps = PropsWithChildren & { className?: string };

const Header: FC<HeaderProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "flex h-12 items-center justify-between gap-4 border-b px-8 lg:h-14",
        className,
      )}
    >
      {children}
    </header>
  );
};

export default Header;
