"use client";
import { FunctionComponent, PropsWithChildren } from "react";
import ClickSpark from "../click-spark/ClickSpark";
import { HeaderNav } from "../navigations/header-nav/HeaderNav";
import { FooterNav } from "../navigations/footer-nav/FooterNav";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      <ClickSpark
        sparkColor="#1fb8d9"
        sparkSize={4}
        sparkRadius={12}
        sparkCount={10}
        duration={400}
        extraScale={1.2}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <HeaderNav />
        {children}
        <FooterNav />
      </ClickSpark>
    </div>
  );
};
