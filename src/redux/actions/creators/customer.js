import { customer } from '../types'
import {fetchCollection, deleteModel} from './general-model'

export const fetchCustomers = fetchCollection(customer)

export const deleteCustomer = deleteModel(customer)
