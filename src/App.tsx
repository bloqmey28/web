import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Experience } from './pages/Experience';
import { Education } from './pages/Education';
import { Skills } from './pages/Skills';
import { Labs } from './pages/Labs';
import { AttackLab } from './pages/AttackLab';
import { LanguageProvider } from './context/LanguageContext';
import { AdminTerminal } from './pages/Admin';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/lab" element={<AttackLab />} />
            <Route path="/nexus-terminal-v8" element={<AdminTerminal />} />
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </LanguageProvider>
    </Router>
  );
}

export default App;
