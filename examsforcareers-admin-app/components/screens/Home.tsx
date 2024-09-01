import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "@/components/screens/tabs";

export default function Home() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
