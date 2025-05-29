export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Polka Malt
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect blockchain freelancer for your project
          </p>
          <a 
            href="/contractors" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium inline-block transition-colors"
          >
            Browse Contractors
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Blockchain Freelance Marketplace</h2>
          <p className="text-gray-600 mb-6">
            Connect with experienced blockchain developers, smart contract experts, and Web3 specialists ready to bring your vision to life.
          </p>
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-gray-500">Get started by exploring our talented contractors!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">👨‍💼</div>
            <h3 className="text-lg font-semibold mb-2">Expert Contractors</h3>
            <p className="text-gray-600">
              Find skilled blockchain developers with proven experience in Solidity, DeFi, and NFTs.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Built on blockchain technology for transparent and secure transactions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Quick Matching</h3>
            <p className="text-gray-600">
              Advanced filtering to find the perfect contractor for your specific needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 