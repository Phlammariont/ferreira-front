import { customer } from '../types'
import {fetchCollection} from './general-model'

export const fetchCustomers = fetchCollection(customer)
