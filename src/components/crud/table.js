import TableBody from '@material-ui/core/TableBody'
import {evolve, isNil, map, reduce, values} from 'ramda'
import Table from '@material-ui/core/Table'
import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const CrudTable = ({ model: { fields }, collection }) => (
  <Table>
    <TableHeader fields={fields}/>
    <TableContent fields={fields} collection={collection}/>
  </Table>
)

const TableHeader = ({fields}) => (
  <TableHead>
    <TableRow>
      {map(TableCellHeader, fields)}
    </TableRow>
  </TableHead>
)

const TableContent = ({fields, collection}) => (
  <TableBody>
    {collection && map(Row(fields), collection)}
  </TableBody>
)

const TableCellHeader = ({label, isHide}) => isHide ? null : <TableCell key={label}>{label}</TableCell>

const Row = fields => item => (
  <TableRow key={item.id}>
    {values(evolve(CellRenderReducer(fields), item))}
  </TableRow>
)

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

export default CrudTable
