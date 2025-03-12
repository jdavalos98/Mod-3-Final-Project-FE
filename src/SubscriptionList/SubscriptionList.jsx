import {useEffect, useState} from 'react'
import './SubscriptionList.css'

function SubscriptionList() {
  const [subscriptions, setSubscriptions] =  useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/subscriptions')
      .then(response => response.json())
      .then(data => setSubscriptions(data))
      .catch(error => console.error('Error fetching subscriptions', error))
  }, [])
}