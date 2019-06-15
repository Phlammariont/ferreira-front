import { inventoryItem } from '../redux/actions/types'
import genericEpicCreator from './general-model'
import InventoryItem from '../model/inventory-item'

export default genericEpicCreator({model: InventoryItem, types: inventoryItem})
