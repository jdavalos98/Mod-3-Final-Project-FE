import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './SubscriptionList.css'

function SubscriptionList() {
  const [subscriptions, setSubscriptions] =  useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/subscriptions')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSubscriptions(data.data);
      })
      .catch(error => console.error('Error fetching subscriptions', error));
  }, []);

  return (
    <section className="subscription-list">
      <header className="list-header">
        <h2>Subscription List</h2>
        <Link to="/" className="back-button">
        Back
        </Link>
      </header>

      <div className="subscriptions">
        {subscriptions.map(subscription => (
          <div className="subscription-item" key={subscription.id}>
            <h3>Subscription: {subscription.attributes.title}</h3>
            <p>Price: {subscription.attributes.price}</p>
            <p>Active Customer subs:{subscription.attributes.customers_subscribed}</p>
            <Link to={`/subscriptions/${subscription.id}`}>
            <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SubscriptionList;