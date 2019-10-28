import {HomeRightPanel} from '../../components/panel'
import React, {Fragment} from 'react'
import { map } from 'ramda'
import styled from 'styled-components'
import {Paper} from '@material-ui/core'
import {Link} from 'react-router-dom'

export const Home = () => (
  <main>
    <h1>Hola Usuario</h1>
    <HomeRightPanel>
      <h2>Mis Tareas Comunes</h2>
      <CommonTasks />
    </HomeRightPanel>
  </main>
)

const HomeTaskContainer = styled(Paper)`
  padding: 1rem
  background-color: ${props => props.background} !important
`

const UndecoratedLink = styled(Link)`
  text-decoration: none
`

const HomeTask = ({title, explanation, background, link}) => {
  return (
    <UndecoratedLink to={ link } key={title + explanation}>
      <HomeTaskContainer elevation={2} background={background}><h3>{title}</h3><p>{explanation}</p></HomeTaskContainer>
    </UndecoratedLink>
  )
}

const renderTasks = map(HomeTask)

const CommonTasks = () => {
  const commonTasks = [{
    title: 'Formulario de Cartera',
    explanation: 'Crea un nuevo record para cartera incluyendo creditos y negocios',
    background: '#f3dc5c',
    link: '/credits/new'
  }]
  return (
    <Fragment>
      {renderTasks(commonTasks)}
    </Fragment>
  )
}
