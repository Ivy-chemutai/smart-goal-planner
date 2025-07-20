import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import NewGoal from './Pages/NewGoal';
import Deposit from './Pages/Deposit';
import Contact from './Pages/Contact';
import ContactButton from './Pages/ContactButton';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<NewGoal />} />
          <Route path="/deposit/:id" element={<Deposit />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ContactButton />
    </div>
  );
}

export default App;