import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { type ChainId } from "@reactive-dot/core";

import "./App.css";
import { Header } from "./components/Header";
import { HomePage, ContractorsPage } from "./pages";

function App({ chainId, setChainId }: { chainId: ChainId; setChainId: React.Dispatch<React.SetStateAction<ChainId>> }) {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header chainId={chainId} setChainId={setChainId} />
        
        <main className="pb-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contractors" element={<ContractorsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
