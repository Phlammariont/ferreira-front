import inventory from './inventory'

const mockInventory = {
  product: {
    name: 'Cama Doble'
  },
  fabric: 'cuerina',
  color: 'negro',
}


describe('In a suite of tests for the Inventory Service', () => {
  it('Find Should search inventory by product', async () => {
    const newInventory = await inventory.save(mockInventory)
    const result = await inventory.find({field: 'product', operator: '==', value: {name: 'Cama Doble'}})
    expect(result.length).toBe(1)
  })
})