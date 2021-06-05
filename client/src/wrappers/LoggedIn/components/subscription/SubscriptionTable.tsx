import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  withStyles,
} from '@material-ui/core'
import EnhancedTableHead from '../../../../common/components/EnhancedTableHead'
import ColorfulChip from '../../../../common/components/ColorfulChip'
import unixToDateString from '../../../../common/functions/unixToDateString'
import HighlightedInformation from '../../../../common/components/HighlightedInformation'
import currencyPrettyPrint from '../../../../common/functions/currencyPrettyPrint'

const styles = (theme: any) => ({
  tableWrapper: {
    overflowX: 'auto',
    width: '100%',
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main,
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
    width: '100%',
  },
  dBlock: {
    display: 'block !important',
  },
  dNone: {
    display: 'none !important',
  },
  firstData: {
    paddingLeft: theme.spacing(3),
  },
})

const rows = [
  {
    id: 'description',
    numeric: false,
    label: 'Action',
  },
  {
    id: 'balanceChange',
    numeric: false,
    label: 'Balance change',
  },
  {
    id: 'date',
    numeric: false,
    label: 'Date',
  },
  {
    id: 'paidUntil',
    numeric: false,
    label: 'Paid until',
  },
]

const rowsPerPage = 25

interface SubscriptionTableProps {
  theme: any
  classes: any
  transactions: any[]
}
const SubscriptionTable: React.FC<SubscriptionTableProps> = (props) => {
  const { transactions, theme, classes } = props
  const [page, setPage] = useState(0)

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page)
    },
    [setPage]
  )

  if (transactions.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rows={rows} />
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell component="th" scope="row" className={classes.firstData}>
                    {transaction.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.balanceChange > 0 ? (
                      <ColorfulChip
                        label={`+${currencyPrettyPrint(transaction.balanceChange)}`}
                        color={theme.palette.secondary.main}
                      />
                    ) : (
                      <ColorfulChip
                        label={currencyPrettyPrint(transaction.balanceChange)}
                        color={theme.palette.error.dark}
                      />
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {unixToDateString(transaction.timestamp)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {transaction.paidUntil ? unixToDateString(transaction.paidUntil) : ''}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: transactions.length > 0 ? classes.dBlock : classes.dNone,
            caption: transactions.length > 0 ? classes.dBlock : classes.dNone,
          }}
          labelRowsPerPage=""
        />
      </div>
    )
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>No transactions received yet.</HighlightedInformation>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(SubscriptionTable)
