import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Link from "next/link";

import { Network, Alchemy } from "alchemy-sdk";
import { formatEther } from "ethers/lib/utils.js";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: 'qW1Wvad8_6LsKyK6hHQy_4x3jSH9Sp6j', // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default function Header() {
    // Use the useAccount hook to store the user's address
    const [ethBalance, setEthBalance] = useState(0);
    const { address, isConnected } = useAccount();
    // const { data: ethBalance } = useBalance({ address, chainId: 534351 });
    const [displayBalance, setDisplayBalance] = useState(false);

    // If the user is connected and has a balance, display the balance
    useEffect(() => {
      const getEthBalance = async () => {
        let balance = await alchemy.core.getBalance(address?.toString(), 'latest');
        balance = formatEther(balance);
        const mainBal = parseFloat(balance).toFixed(4);
        setEthBalance(mainBal);
        console.log(mainBal);
        console.log(`Balance of ${address}: ${balance} ETH`);
      }
      getEthBalance()
    }, []);

    return (
        <Disclosure as="nav" className="">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center text-2xl">
                                    <Link
                                        href="/"
                                        className="text-2xl inline-flex items-center px-1 pt-1 font-medium text-gray-900"
                                    >
                                        GUESSY
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center">

                                <div>
                                        <span
                                            className="inline-block text-dark ml-4 px-6 py-2.5 font-medium text-md leading-tight rounded-2xl shadow-none "
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModalCenter"
                                        >
                                            {/* Balance: {Number(ethBalance?.formatted || 0).toFixed(2)}{" "} */}
                                            ETH Balance : {0 || ethBalance}
                                        </span>
                                </div>

                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <ConnectButton
                                        showBalance={{ smallScreen: true, largeScreen: false }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* for mobile */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2 pb-4">
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
                            >
                                Home
                            </Disclosure.Button>
                            {/* Add here your custom menu elements */}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
