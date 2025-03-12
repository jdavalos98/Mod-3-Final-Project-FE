import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SubscriptionList from './SubscriptionList/SubscriptionList'; 

function App() {
  return (
      <section className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />

        </Routes>
      </section>
  );
}

export default App;