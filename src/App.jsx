import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SubscriptionList from './components/SubscriptionList'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;