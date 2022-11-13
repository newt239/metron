import { ReactElement } from "react";

import Header from "./components/layouts/Header";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
  </>
);
export default Layout;
