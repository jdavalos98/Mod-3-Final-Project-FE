import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <section className="home-container">
      <header className="home-header">
        <h1>Welcome to the Tea Subscription Admin Portal</h1>
        <p>Your go-to platform for exploring and managing our tea subscriptions</p>
      </header>

      <nav className="home-nav">
        <Link to="/subscriptions" className="home-link">
          View All Subscriptions
        </Link>
      </nav>
    </section>
  )
}

export default HomePage;