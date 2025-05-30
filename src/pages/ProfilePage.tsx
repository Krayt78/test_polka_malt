import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletConnection } from "../hooks/use-wallet-connection";
import { useTalent } from "../contexts/talent-context";

export function ProfilePage() {
  const navigate = useNavigate();
  const { isConnected, connectedWallet, accounts, walletName } = useWalletConnection();
  const { getTalentByWalletAddress, updateTalent, createTalentProfile } = useTalent();
  
  // Form state
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState(0);
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Current user's wallet address
  const currentWalletAddress = accounts[0]?.address;

  // Additional check: redirect if wallet is disconnected
  useEffect(() => {
    if (!isConnected || accounts.length === 0) {
      navigate("/", { replace: true });
    }
  }, [isConnected, accounts, navigate]);
  
  // Load existing talent data if profile exists
  useEffect(() => {
    if (currentWalletAddress) {
      const existingTalent = getTalentByWalletAddress(currentWalletAddress);
      if (existingTalent) {
        setDisplayName(existingTalent.name);
        setBio(existingTalent.description);
        setSkills(existingTalent.skills.join(", "));
        setTitle(existingTalent.title);
        setRate(existingTalent.rate);
        setLocation(existingTalent.location);
        setIsAvailable(existingTalent.isAvailable);
      } else {
        // Set default values for new profile
        setDisplayName(accounts[0]?.name || "");
      }
    }
  }, [currentWalletAddress, getTalentByWalletAddress, accounts]);

  const handleSaveChanges = async () => {
    if (!currentWalletAddress) {
      setSaveMessage("No wallet address found");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    try {
      const skillsArray = skills.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0);
      
      const profileData = {
        name: displayName,
        description: bio,
        skills: skillsArray,
        title: title,
        rate: rate,
        location: location,
        isAvailable: isAvailable,
      };

      const existingTalent = getTalentByWalletAddress(currentWalletAddress);
      
      if (existingTalent) {
        // Update existing talent
        updateTalent(existingTalent.id, profileData);
        setSaveMessage("Profile updated successfully!");
      } else {
        // Create new talent profile
        createTalentProfile(currentWalletAddress, profileData);
        setSaveMessage("Profile created successfully!");
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveMessage("Error saving profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Don't render anything if wallet is not connected (additional safety)
  if (!isConnected || accounts.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {accounts[0]?.name?.[0]?.toUpperCase() || displayName?.[0]?.toUpperCase() || "P"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome to your Polka Talent profile
                </p>
              </div>
            </div>
          </div>

          {/* Accounts */}
          {accounts.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Connected Accounts
              </h2>
              <div className="space-y-4">
                {accounts.map((account, index) => (
                  <div 
                    key={account.address || index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Account Name
                        </label>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <span className="text-gray-900 dark:text-white">
                            {account.name || `Account ${index + 1}`}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address
                        </label>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <span className="text-gray-900 dark:text-white font-mono text-sm break-all">
                            {account.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Profile Settings
            </h2>
            
            {/* Save Message */}
            {saveMessage && (
              <div className={`mb-4 p-3 rounded-md ${
                saveMessage.includes("Error") 
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200" 
                  : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              }`}>
                {saveMessage}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter your display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., Blockchain Developer | Smart Contract Specialist"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Tell others about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                  placeholder="JavaScript, React, Blockchain, Solidity, etc. (comma-separated)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Daily Rate ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                    placeholder="500"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Available for work
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  {isSaving && (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 