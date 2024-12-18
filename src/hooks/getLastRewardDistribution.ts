/* eslint-disable @typescript-eslint/no-explicit-any */

import { Wallet } from "@/wallet/WallletSelector";
import { useState, useCallback } from "react";

export const useLastRewardDistribution = (
  wallet: Wallet | undefined,
  contractId: string
) => {
  const [rewardDistribution, setRewardDistribution] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLastRewardDistribution = useCallback(async () => {
    if (!wallet) {
      throw new Error("Wallet is not connected");
    }

    setLoading(true);
    setError(null);

    try {
      const result = await wallet.viewMethod({
        contractId,
        method: "get_last_reward_distribution",
        args: {},
      });
      console.log("Reward distribution result:", result);

      setRewardDistribution(result);
    } catch (err) {
      console.error("Error fetching reward distribution:", err);
      setError("Failed to fetch reward distribution");
    } finally {
      setLoading(false);
    }
  }, [wallet, contractId]);

  return {
    rewardDistribution,
    loading,
    error,
    fetchLastRewardDistribution,
  };
};
