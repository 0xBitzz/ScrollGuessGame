
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
// Import ethers to format the price of the product correctly
import { BigNumber, ethers } from "ethers";
// Import the useConnectModal hook to trigger the wallet connect modal
import { useConnectModal } from "@rainbow-me/rainbowkit";
// Import the useAccount hook to get the user's address
import { useAccount } from "wagmi";
// Import the toast library to display notifications
import { toast } from "react-toastify";
// Import our custom identicon template to display the owner of the product
import { identiconTemplate } from "@/helpers";
// Import our custom hooks to interact with the smart contract
import { useContractCall } from "@/hooks/contract/useContractRead";
import { useContractSend } from "@/hooks/contract/useContractWrite";


const Game = ({ id, setError, setLoading, clear }: any) => {

  const [bet, setBet] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const _amount = ethers.utils.parseEther(0.01.toString());
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: revealRandomNumber }: any = useContractCall("revealRandomNumber", undefined, true);
  const { writeAsync: placeBet } = useContractSend("placeBet", [Number(bet)], _amount);
  const { writeAsync: claimReward } = useContractSend("claimReward", [], undefined);
  const { writeAsync: withdrawFunds } = useContractSend("withdrawFunds", [], undefined);



  const handlePlaceBet = async () => {
    if (!placeBet) {
      throw "Failed to like this news";
    }
    const res = await placeBet();
    await res.wait();
  };

  const placeBet_ = async () => {

    try {
      // If the user is not connected, trigger the wallet connect modal
      if (!address && openConnectModal) {
        openConnectModal();
        return;
      }
      // If the user is connected, call the handlePurchase function and display a notification
      await toast.promise(handlePlaceBet(), {
        pending: "Placing Bet...",
        success: "Bet Placed",
        error: "Failed to place bet",
      });
      // If there is an error, display the error message
    } catch (e: any) {
      console.log({ e });
      setError(e?.reason || e?.message || "Something went wrong. Try again.");
      // Once the purchase is complete, clear the loading state
    } 
  };



  const handleClaimReward = async () => {
    if (!claimReward) {
      throw "Failed to tip this news creator";
    }
    const res = await claimReward();
    await res.wait();
  };

  const claimReward_ = async () => {

    try {
      // If the user is not connected, trigger the wallet connect modal
      if (!address && openConnectModal) {
        openConnectModal();
        return;
      }
      // If the user is connected, call the handlePurchase function and display a notification
      await toast.promise(handleClaimReward(), {
        pending: "Claiming Reward...",
        success: "Reward Claimed",
        error: "Failed to claim reward",
      });
      // If there is an error, display the error message
    } catch (e: any) {
      console.log({ e });
      setError(e?.reason || e?.message || "Something went wrong. Try again.");
      // Once the purchase is complete, clear the loading state
    }
  };

  const handleWithdrawFunds = async () => {
    if (!withdrawFunds) {
      throw "Failed";
    }
    const res = await withdrawFunds();
    await res.wait();
  };

  const withdrawFunds_ = async () => {

    try {
      // If the user is not connected, trigger the wallet connect modal
      if (!address && openConnectModal) {
        openConnectModal();
        return;
      }
      // If the user is connected, call the handlePurchase function and display a notification
      await toast.promise(handleWithdrawFunds(), {
        pending: "Withdrawing Funds...",
        success: "Funds Withdrawn",
        error: "Failed to withdraw funds",
      });
      // If there is an error, display the error message
    } catch (e: any) {
      console.log({ e });
      setError(e?.reason || e?.message || "Something went wrong. Try again.");
      // Once the purchase is complete, clear the loading state
    }
  };

  const handleRevealRandomNumber = async () => {
    if (!revealRandomNumber) return null;
    setRandomNumber(revealRandomNumber);

  };



  return (
    <div className={"relative rounded-b-lg"}>

      <div className="flex mt-10">
        <input type="text" id="first_name" className="bg-gray-300 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your guess" required onChange={(e) => setBet(e.target.value as unknown as number)} />

        <button className="bg-black text-white p-4 rounded-lg ml-4" onClick={() => {
          placeBet_();
        }}>
          PlaceBet
        </button>
      </div>

      <div className="flex mt-10">

        <div className="mb-2 mr-4">

        </div>
        <div className="mb-2 mr-4">
          <button className="bg-black text-white p-4 rounded-lg" onClick={() => {
            revealRandomNumber_();
          }}>
            RevealRandomNumber
          </button>

        </div>
        <div className="mb-2 mr-4">
          <button className="bg-black text-white p-4 rounded-lg" onClick={() => {
            claimReward_();
          }}>
            ClaimReward
          </button>

        </div>
        <div className="mb-2 mr-4">
          <button className="bg-black text-white p-4 rounded-lg" onClick={() => {
            withdrawFunds_();
          }}>
            WithdrawFunds
          </button>

        </div>


      </div>

      <div className="flex justify-center mt-10">
        {
          randomNumber > 0 ? `Random Number is ${randomNumber}` : ""
        }
        
      </div>
    </div>
  );
};

export default Game;
