// This file is the entry point for the app. It is used to wrap the app with the RainbowKitProvider and WagmiConfig components.

// Import the global style sheet as well as the RainbowKit and react-toastify stylesheets.
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";

// Import the connectorsForWallets function to create a list of wallets to connect to.
// Import the RainbowKitProvider component to wrap the app with.
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

// Import three different wallets connectors from the RainbowKit package.
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
//
import { Chain, getDefaultWallets } from "@rainbow-me/rainbowkit";
// Import configureChains, createClient, and WagmiConfig from the Wagmi package to configure the Wagmi client.
import { configureChains, createClient, WagmiConfig } from "wagmi";

// Import the jsonRpcProvider from the Wagmi package to specify the RPC URLs of the chains we want to connect to.
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import Layout from "../components/Layout";

// Import the ToastContainer component from react-toastify to display notifications.
import { ToastContainer } from "react-toastify";

import { publicProvider } from "wagmi/providers/public";
const EduChain: Chain = {
    id: 656476,
    name: "Open Campus Codex Sepolia",
    network: "Open Campus Codex Sepolia",
    iconUrl: "https://example.com/icon.svg",
    iconBackground: "#fff",
    nativeCurrency: {
        decimals: 18,
        name: "EDU",
        symbol: "EDU",
    },
    rpcUrls: {
        public: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
        default: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
    },
    blockExplorers: {
      default: {
        name: "Blockscout",
        url: "https://opencampus-codex.blockscout.com"
      }
    },

    testnet: true,
};
const { provider, chains } = configureChains([EduChain], [publicProvider()]);

const { connectors } = getDefaultWallets({
    appName: "Guessy",
    projectId: "314ba89e5e175d1d7e7154861b357cbe",
    chains,
});

// Create the Wagmi client.
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

// Create and export the App component wrapped with the RainbowKitProvider and WagmiConfig.
function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} coolMode={true}>
                <ToastContainer position={"bottom-center"} />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;
