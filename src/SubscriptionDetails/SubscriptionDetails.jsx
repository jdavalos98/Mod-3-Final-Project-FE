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

  
}