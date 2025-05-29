export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Polka Malt
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find the perfect blockchain freelancer for your project
          </p>
          <a 
            href="/contractors" 
            className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium inline-block transition-colors"
          >
            Browse Contractors
          </a>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Your Blockchain Freelance Marketplace</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect with experienced blockchain developers, smart contract experts, and Web3 specialists ready to bring your vision to life.
          </p>
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-gray-500 dark:text-gray-400">Get started by exploring our talented contractors!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">👨‍💼</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Expert Contractors</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find skilled blockchain developers with proven experience in Solidity, DeFi, and NFTs.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built on blockchain technology for transparent and secure transactions.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Quick Matching</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced filtering to find the perfect contractor for your specific needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 