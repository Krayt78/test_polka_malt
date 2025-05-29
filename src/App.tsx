import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components/Header";
import { HomePage, ContractorsPage } from "./pages";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
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
