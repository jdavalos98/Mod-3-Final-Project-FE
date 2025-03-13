import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SubscriptionList from './SubscriptionList/SubscriptionList'; 
import SubscriptionDetails from './SubscriptionDetails/SubscriptionDetails'

function App() {
  return (
      <section className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
          <Route path="/subscriptions/:subscriptionId" element={<SubscriptionDetails />} />
        </Routes>
      </section>
  );
}

export default App;