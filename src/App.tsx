import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { ProtectedRoute } from "./components/protected-route";
import { ThemeProvider } from "./contexts/theme-context";
import { TalentProvider } from "./contexts/talent-context";
import { HomePage, TalentsPage, ProfilePage } from "./pages";

function App() {
  return (
    <ThemeProvider>
      <TalentProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/talents" element={<TalentsPage />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
          </div>
        </Router>
      </TalentProvider>
    </ThemeProvider>
  );
}

export default App;
