import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './SubscriptionList.css'

function SubscriptionList() {
  const [subscriptions, setSubscriptions] =  useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/api/v1/subscriptions')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubscriptions(data.data);
        setFilteredSubscriptions(data.data); // Initially show all subscriptions
      })
      .catch((error) => console.error('Error fetching subscriptions', error));
  }, []);

  useEffect(() => {
    // Filter subscriptions based on the search term
    setFilteredSubscriptions(
      subscriptions.filter((subscription) =>
        subscription.attributes.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, subscriptions]);

  return (
    <section className="subscription-list">
      <header className="list-header">
        <h2>Subscription List</h2>
        <Link to="/" className="back-button">
          Back
        </Link>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="subscriptions">
        {filteredSubscriptions.map((subscription) => (
          <div className="subscription-item" key={subscription.id}>
            <h3>Subscription: {subscription.attributes.title}</h3>
            <p>Price: {subscription.attributes.price}</p>
            <p>Active Customer subs: {subscription.attributes.customers_subscribed}</p>
            <Link to={`/subscriptions/${subscription.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SubscriptionList;