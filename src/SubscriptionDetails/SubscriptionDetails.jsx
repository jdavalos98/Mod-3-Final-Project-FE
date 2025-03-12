import {useEffect, useState} from  'react'
import {useParams, link} from 'react-router-dom'
import './SubscriptionDetail.css'

function SubscriptionDetail() {
  const {id} = useParams()
  const[subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() {
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`)
      .then(response => response.json())
      .then(data => {
        setSubscription(data.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching subscription details', error)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Loading data...</p>
  }
  
  const {attributes} = subscription.
  
  return (
    <section className="subscription-detail">
      <header>
        <h2>Subscription Details</h2>
      </header>
      <div className="subscription-info">
        <h3>{attributes.title}</h3>
        <p><strong>Price:</strong> ${attributes.price}</p>
        <p><strong>Frequency:</strong> {attributes.frequency}</p>
        <p><strong>Customers Subscribed:</strong>{attributes.customer_subscribed}</p>

        <h4>Customers:</h4>
        <ul>
          {attributes.customers.map((customer, index) => (
            <li key={(index)}>
              <p><strong>{customer.title}</strong></p>
              <p>Email: {customer.email}</p>
              <p>Status: {customer.status ? 'Active' : 'Cancelled'}</p>
            </li>
          ))}
        </ul>

        <h4>Teas:</h4>
        <ul>
          {attributes.teas.map((tea, index) => (
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
  )
}

export default SubscriptionDetail;