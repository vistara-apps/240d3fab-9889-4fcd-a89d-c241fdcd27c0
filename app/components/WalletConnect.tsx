'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

export function WalletConnect() {
  return (
    <div className="flex items-center gap-4">
      <Wallet>
        <ConnectWallet>
          <div className="flex items-center gap-3 px-4 py-2 bg-surface border border-border rounded-lg hover:bg-opacity-80 transition-colors">
            <Avatar className="h-8 w-8" />
            <div className="flex flex-col">
              <Name className="text-sm font-medium text-text-primary" />
              <span className="text-xs text-text-secondary">Connected</span>
            </div>
          </div>
        </ConnectWallet>
      </Wallet>
    </div>
  );
}
