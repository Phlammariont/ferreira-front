import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export const ActionsContainer = styled.div`
  margin: 2rem
  display: flex
  flex-direction: row-reverse
  &>div {
    margin-left: 1rem;
  }
`
export const InlineFormContainer = styled.div`
  display: flex
  flex-direction: row
  &>div {
    margin-left: 1rem;
  }
  &>*:first-child {
    margin-left: 0;
    margin-right: 1rem;
  }
`

export const ActionButton = styled(Button)`
  flex-grow: 1
`