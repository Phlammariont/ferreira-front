import TableBody from '@material-ui/core/TableBody'
import {evolve, isNil, map, reduce, values} from 'ramda'
import Table from '@material-ui/core/Table'
import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import DeleteForever from '@material-ui/icons/DeleteForever'
import Fab from '@material-ui/core/Fab'

const CrudTable = ({ model: { fields }, collection, actions }) => (
  <Table>
    <TableHeader fields={fields}/>
    <TableContent fields={fields} collection={collection} actions={actions}/>
  </Table>
)

const TableHeader = ({fields}) => (
  <TableHead>
    <TableRow>
      {map(TableCellHeader, fields)}
      <TableCell key='actions'>Actions</TableCell>
    </TableRow>
  </TableHead>
)

const TableContent = ({fields, collection, actions}) => (
  <TableBody>
    {collection && map(Row(fields, actions), collection)}
  </TableBody>
)

const TableCellHeader = ({label, isHide}) => isHide ? null : <TableCell key={label}>{label}</TableCell>

const Row = (fields, actions) => item => {
  if (isNil(item) || item.isDeleted) return null
  return (
    <TableRow key={item.id}>
      {values(evolve(CellRenderReducer(fields), item))}
      {renderActions(actions, item)}
    </TableRow>
  )
}

const CellRenderReducer = reduce((Renders, field) => {
  return {
    ...Renders,
    [field.name]: Cell(field),
  }
}, {})

const renderModel = ({Model, value }) => {
  if ( Model instanceof Array) {
    return map(item => <span key={item.id}> {new Model[0](item).toString()} </span>, value)
  }
  return new Model(value).toString()
}

const Cell = field => value => {
  if (field.isHide) return null
  return (
    <TableCell key={value.id || value}>
      {isNil(field.instanceOf) ? value : renderModel({ Model: field.instanceOf, value })}
    </TableCell>
  )
}

const renderActions = (actions, item) => {
  return <TableCell key={'actions-'+ (item.id)}>
    <Fab onClick={() => actions.onDelete(item)}><DeleteForever>delete_forever</DeleteForever></Fab>
  </TableCell>
}

export default CrudTable
