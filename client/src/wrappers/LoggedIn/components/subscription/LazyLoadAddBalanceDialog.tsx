import React, { useState, useEffect, Fragment } from 'react'
import { Nullable } from '@helpers/commonInterfaces/interfaces'

interface LazyLoadAddBalanceDialogProps {
  open: boolean
  onClose: (event: any) => void
  onSuccess: (event: any) => void
}

export interface AddBalanceDialogProps {
  open: boolean
  theme?: any
  onClose: (event: any) => void
  onSuccess: (event: any) => void
}

const LazyLoadAddBalanceDialog: React.FC<LazyLoadAddBalanceDialogProps> = (props) => {
  const { open, onClose, onSuccess } = props
  const [AddBalanceDialog, setAddBalanceDialog] = useState<
    Nullable<React.FC<AddBalanceDialogProps>>
  >(null)
  const [hasFetchedAddBalanceDialog, setHasFetchedAddBlanceDialog] = useState(false)

  useEffect(() => {
    if (open && !hasFetchedAddBalanceDialog) {
      setHasFetchedAddBlanceDialog(true)
      import('./AddBalanceDialog').then((Component) => {
        setAddBalanceDialog(() => Component.default)
      })
    }
  }, [open, hasFetchedAddBalanceDialog, setHasFetchedAddBlanceDialog, setAddBalanceDialog])

  return (
    <Fragment>
      {AddBalanceDialog && (
        <AddBalanceDialog open={open} onClose={onClose} onSuccess={onSuccess}></AddBalanceDialog>
      )}
    </Fragment>
  )
}

export default LazyLoadAddBalanceDialog
