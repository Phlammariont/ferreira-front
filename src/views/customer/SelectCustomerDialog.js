import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Autocomplete from '../../components/autocomplete'
import DialogActions from '@material-ui/core/DialogActions'
import {ActionsContainer} from '../../components/layout'
import Button from '@material-ui/core/Button'
import {getCustomerCollection} from '../../selectors/customer'
import {connect} from 'react-redux'
import {CustomerContainer} from './style'

const FindCustomer = ({open = false, close, customers, handleCustomer}) => {
  const [customer, setCustomer] = useState()
  return (
    <Dialog
      open={open}
      maxWidth='md'
      fullWidth={true}
      onClose={close}>
      <DialogTitle>
        Selecciona Un Cliente
      </DialogTitle>
      <DialogContent>
        <CustomerContainer>
          {customer && (
            <CustomerContainer>
              <span>{customer.name}</span> - <span>{customer.legalId}</span>
            </CustomerContainer>
          )}
          <Autocomplete
            label='Cedula'
            data={customers}
            itemField='legalId'
            onChange={selectedCustomer => {
              setCustomer(selectedCustomer)
            }}/>
        </CustomerContainer>
      </DialogContent>
      <DialogActions>
        <ActionsContainer>
          <Button onClick={() => handleCustomer(customer)}>Continuar</Button>
          <Button onClick={close}>Cancelar</Button>
        </ActionsContainer>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  customers: getCustomerCollection(state),
})

export default connect(mapStateToProps)(FindCustomer)