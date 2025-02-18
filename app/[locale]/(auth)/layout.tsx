import React, { ReactNode } from "react";

const authLayout = ({ children }: { children: ReactNode }) => {
  return <main>{children}</main>;
};

export default authLayout;
