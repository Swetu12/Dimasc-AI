'use client'

import * as React from "react";
import Image from "next/image";
import {useTheme} from "next-themes";

type LogoProps = {
  logoType?: "default" | "icon";
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ logoType = "default", className }) => {
  const { resolvedTheme } = useTheme()
  return logoType === "default" ? (
      <img
          src={resolvedTheme === "light" ? "/logo-black.svg" : "/logo.svg"}
          alt="Logo"
          width={150}
          height={31}
          className={className}
      />
  ) : (
    <Image
      src="/favicon.svg"
      alt="Logo"
      width={32}
      height={32}
      className={className}
    />
  );
};

export default Logo;
