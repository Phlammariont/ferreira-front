import { customer } from '../types'

export const fetchCustomers = () => ({
  type: customer.FETCH_COLLECTION
})

export const setCustomerCollection = customers => ({
  type: customer.SET_COLLECTION,
  collection: customers
})

export const addToCustomerCollection = customers => ({
  type: customer.ADD_TO_COLLECTION,
  collection: customers
})