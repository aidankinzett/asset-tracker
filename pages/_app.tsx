import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { theme } from "@/ui";
import { trpc } from "@/utils/trpc";

const App = ({ Component, pageProps }: AppProps) => (

    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
);

export default trpc.withTRPC(App);
