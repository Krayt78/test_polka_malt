export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Polka Talent
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find the perfect blockchain talent for your project
          </p>
          <a 
            href="/talents" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center"
          >
            Browse Talents
          </a>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Your Blockchain Talent Marketplace</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect with experienced blockchain developers, marketing experts, and Web3 specialists ready to bring your vision to life.
          </p>
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-gray-500 dark:text-gray-400">Get started by exploring the community's amazing talents and connect with them!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">👨‍💼</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Expert Talents</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find skilled blockchain developers with proven experience in the ecosystem.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Decentralized Profiles</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Wallet-linked profiles ensure authentic talent verification and reputation tracking.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Quick Matching</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced filtering to find the perfect talent for your specific needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 