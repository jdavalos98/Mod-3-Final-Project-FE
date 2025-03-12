import {useEffect, useState} from 'react'
import './SubscriptionList.css'

function SubscriptionList() {
  const [subscriptions, setSubscriptions] =  useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/subscriptions')
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Log the response to check structure
        setSubscriptions(data.data);  // Update this line to access the 'data' array
      })
      .catch(error => console.error('Error fetching subscriptions', error));
  }, []);

  return (
    <section className="subscription-list">
      <header className="list-header">
        <h2>Subscription List</h2>
      </header>

      <div className="subscriptions">
        {subscriptions.map(subscription => (
          <div className="subscription-item" key={subscription.id}>
            <h3>Subscription:{subscription.attributes.title}</h3>
            <p>Price: {subscription.attributes.price}</p>
            <p>Active Customer subs:{subscription.attributes.customers_subscribed}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SubscriptionList;