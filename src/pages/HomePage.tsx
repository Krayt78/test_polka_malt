import { ChainPage } from "../ChainPage";

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Polkadot App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect to the Polkadot ecosystem and interact with multiple chains
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <ChainPage />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="text-lg font-semibold mb-2">Multi-Chain Support</h3>
            <p className="text-gray-600">
              Connect to Polkadot, Kusama, and their parachains seamlessly.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">💳</div>
            <h3 className="text-lg font-semibold mb-2">Wallet Integration</h3>
            <p className="text-gray-600">
              Support for multiple wallet providers including browser extensions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Data</h3>
            <p className="text-gray-600">
              Get live blockchain data including blocks, timestamps, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 