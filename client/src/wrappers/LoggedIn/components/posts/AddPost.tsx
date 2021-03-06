import React, { Fragment, useState, useCallback } from 'react'
import { Button, Box } from '@material-ui/core'
import ActionPaper from '../../../../common/components/ActionPaper'
import ButtonCircularProgress from '../../../../common/components/ButtonCircularProgress'
import AddPostOptions from './AddPostOptions'

interface AddPostProps {
  pushMessageToSnackbar: (message: { isErrorMessage: boolean; text: string }) => void
  onClose: () => void
  Dropzone: any
  EmojiTextArea: any
  DateTimePicker: any
  ImageCropper: any
}
const AddPost: React.FC<AddPostProps> = (props) => {
  const {
    pushMessageToSnackbar,
    Dropzone,
    EmojiTextArea,
    DateTimePicker,
    ImageCropper,
    onClose,
  } = props

  const [files, setFiles] = useState<any[]>([])
  const [uploadAt, setUploadAt] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [cropperFile, setCropperFile] = useState<any>(null)

  const acceptDrop = useCallback(
    (file) => {
      setFiles([file])
    },
    [setFiles]
  )

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length + rejectedFiles.length > 1) {
        pushMessageToSnackbar({
          isErrorMessage: true,
          text: 'You cannot upload more than one file at once',
        })
      } else if (acceptedFiles.length === 0) {
        pushMessageToSnackbar({
          isErrorMessage: true,
          text: "The file you wanted to upload isn't an image",
        })
      } else if (acceptedFiles.length === 1) {
        const file = acceptedFiles[0]
        file.preview = URL.createObjectURL(file)
        file.key = new Date().getTime()
        setCropperFile(file)
      }
    },
    [pushMessageToSnackbar, setCropperFile]
  )

  const onCropperClose = useCallback(() => {
    setCropperFile(null)
  }, [setCropperFile])

  const deleteItem = useCallback(() => {
    setCropperFile(null)
    setFiles([])
  }, [setCropperFile, setFiles])

  const onCrop = useCallback(
    (dataUrl) => {
      const file = { ...cropperFile }
      file.preview = dataUrl
      acceptDrop(file)
      setCropperFile(null)
    },
    [acceptDrop, cropperFile, setCropperFile]
  )

  const handleUpload = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      pushMessageToSnackbar({
        isErrorMessage: false,
        text: 'Your post has been uploaded',
      })
      onClose()
    }, 1500)
  }, [setLoading, onClose, pushMessageToSnackbar])

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        content={
          <AddPostOptions
            EmojiTextArea={EmojiTextArea}
            Dropzone={Dropzone}
            files={files}
            onDrop={onDrop}
            deleteItem={deleteItem}
            DateTimePicker={DateTimePicker}
            uploadAt={uploadAt}
            onChangeUploadAt={setUploadAt}
            onCrop={onCrop}
            ImageCropper={ImageCropper}
            cropperFile={cropperFile}
            onCropperClose={onCropperClose}
          />
        }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={onClose} disabled={loading}>
                Back
              </Button>
            </Box>
            <Button
              onClick={handleUpload}
              variant="contained"
              color="secondary"
              disabled={files.length === 0 || loading}
            >
              Upload {loading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  )
}

export default AddPost
