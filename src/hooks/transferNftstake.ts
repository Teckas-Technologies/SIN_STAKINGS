import { Wallet } from "@/wallet/WallletSelector";
import { useCallback } from "react";

export const useNftTransferCall = (
  wallet: Wallet | undefined,
  contractId: string
) => {
  const transferNft = useCallback(
    async (
      tokenId: string,
      receiverId: string,
      senderId: string
    ) => {
      if (!wallet) {
        throw new Error("Wallet is not connected");
      }

      try {
        console.log("Initiating NFT transfer call...");
        console.log("Nft Stake called.......");
        const callbackUrl = `${
            window.location.origin
          }/account?isNftStake=true&senderId=${encodeURIComponent(senderId)}`;
          const msg = JSON.stringify({
            reference_blob: {
              attributes: [
                { trait_type: "Body", value: "Queen" },
                { trait_type: "Wings", value: "Diamond" },
              ],
            },
          });
        const result = await wallet.callMethod({
          contractId, 
          callbackUrl,
          method: "nft_transfer_call", 
          args: {
            receiver_id: receiverId,
            token_id: tokenId,
            // approval_id: approvalId,
            msg, 
          },
          gas: "300000000000000", 
          deposit: "1",
        });

        console.log("NFT Transfer Call Result:", result);
        return result;
      } catch (error) {
        console.error("Error in nft_transfer_call:", error);
        throw error;
      }
    },
    [wallet, contractId]
  );

  return { transferNft };
};
