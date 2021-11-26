import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import 'fontsource-roboto'
import './popup.css'
import {
  getStoredOverlayOption,
  setStoredOverlayOption,
  LocalStorageOptions,
} from '../utils/storage'
import { SelectChangeEventHandler } from '../utils/types'

// This component shows the 'Bingle Display Settings' options popup.
// The component is displayed when the Bingle chrome extension icon is clicked.
const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    // Set options from the saved options in local storage.
    getStoredOverlayOption().then((options) => setOptions(options))
  }, [])

  // Save the selected display options setting.
  const handleOptionsChange = (e: SelectChangeEventHandler) => {
    const selectedValue = e.target.value

    setStoredOverlayOption(selectedValue).then(() => {
      setOptions({ ...options, overlayOption: selectedValue })
    })
  }

  // Don't display the popup if 'options' has not been set yet from local storage.
  if (!options) {
    return null
  }

  return (
    <Box px="8px" py="4px">
      <FormControl component="fieldset">
        <FormLabel component="legend">Bingle Display Settings</FormLabel>
        <RadioGroup
          value={options.overlayOption}
          onChange={(e) => handleOptionsChange(e)}
        >
          <FormControlLabel value="auto" control={<Radio />} label="Auto" />
          <FormControlLabel value="toggle" control={<Radio />} label="Toggle" />
          <FormControlLabel
            value="disable"
            control={<Radio />}
            label="Disable"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
