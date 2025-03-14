import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SubscriptionDetails.css';

function SubscriptionDetails() {
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const { subscriptionId } = useParams();

  useEffect(() => {
    console.log('Subscription id', subscriptionId);
    if (subscriptionId) {
      fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched subscription details:', data)
          setSubscriptionDetails(data.data);
        })
        .catch((error) => {
          console.error('Error fetching subscription details:', error);
        });
    }
  }, [subscriptionId]); 

  const updateSubscriptionStatus = (subscriptionId, customerId, newStatus) => {

    fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}/subscription_customers/${customerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: newStatus
      }) 
    })
      .then(() => {
        setSubscriptionDetails((prevDetails) => {
          const updatedCustomers = prevDetails.attributes.customers.map((customer) => {
            if (customer.id === customerId) {
              return { ...customer, status: newStatus };
            }
            return customer; 
          });
          return {
            ...prevDetails,
            attributes: {
              ...prevDetails.attributes,
              customers: updatedCustomers
            }
          };
        });
      })
      .catch((error) => {
        console.error('Error toggling subscription status:', error);
      });
  };

  if (!subscriptionDetails) {
    return <p>Loading...</p>; 
  }

  return (
    <section className="subscription-detail">
      <header>
        <h2>Subscription Details</h2>
      </header>
      <div className="subscription-info">
        <h3><strong className="subscription-title">Title: {subscriptionDetails.attributes.title}</strong></h3>
        <p><strong>Price:</strong> ${subscriptionDetails.attributes.price}</p>
        <p><strong>Frequency:</strong> {subscriptionDetails.attributes.frequency}</p>
        <p><strong>Customers Subscribed:</strong> {subscriptionDetails.attributes.customers_subscribed}</p>

        <h4>Customers:</h4>
        <ul>
          {subscriptionDetails.attributes.customers.map((customer, index) => (
            <li key={index}>
              <p><strong>Customer: {customer.title}</strong></p>
              <p>Email: {customer.email}</p>
              <p>Status: {customer.status ? 'Active' : 'Cancelled'}</p>
              <button 
                className="cancel-button" 
                onClick={() => updateSubscriptionStatus(subscriptionId, customer.id, !customer.status)}
              >
                {customer.status ? 'Cancel Subscription' : 'Reactivate Subscription'}
              </button>
            </li>
          ))}
        </ul>

        <h4>Teas:</h4>
        <ul>
          {subscriptionDetails.attributes.teas.map((tea, index) => (
            <li key={index}>
              <p><strong>{tea.title}</strong></p>
              <p>{tea.description}</p>
              <p>Temperature: {tea.temperature}</p>
              <p>Brew Time: {tea.brew_time} minutes</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SubscriptionDetails;