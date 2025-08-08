import { cn } from "@/utils/cn";
import React from "react";
import { Text as ReactNativeText } from "react-native";

type Props = React.ComponentProps<typeof ReactNativeText> & {
  className?: string;
};

export const Text = ({ children, className, ...props }: Props) => {
  return (
    <ReactNativeText className={cn("text-black dark:text-white", className)} {...props}>
      {children}
    </ReactNativeText>
  );
};
