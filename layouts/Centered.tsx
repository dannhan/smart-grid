import type { FC, PropsWithChildren } from "react";

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex h-screen w-full min-w-0 items-center justify-center px-4 py-14 md:px-14 lg:px-28">
    {children}
  </div>
);

export default CenteredLayout;
