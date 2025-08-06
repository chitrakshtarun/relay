import { useScreenOptions } from "@/hooks/use-screen-options";
import { Stack } from "expo-router";

const HomeLayout = () => {
  const screenOptions = useScreenOptions("Relay");
  return <Stack screenOptions={screenOptions} />;
};

export default HomeLayout;
