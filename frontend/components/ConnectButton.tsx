"use client";

import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTargetNetwork } from "@/hooks/use-target-network";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { formatAddressOrEns } from "@/utils/address";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  const { targetNetwork } = useTargetNetwork();
  const { address } = useAccount()
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-lg bg-white/25  text-black border-0"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported || chain.id !== targetNetwork.id) {
                return <WrongNetworkDropdown />;
              }

              return (
                <div>
                  {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
                  {address && <div>{formatAddressOrEns(address, ensName)}</div>}
                    <button className="btn btn-lg  bg-white/25 text-black border-0" onClick={() => disconnect()}>
                      Disconnect
                    </button>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};