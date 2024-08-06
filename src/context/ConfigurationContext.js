import React from 'react'

const ConfigurationContext = React.createContext({
  searchResponse: {},
  apiStatus: 'INITIAL',
  searchInput: '',
  onChangeSearchInput: () => {},
  onTriggerSearchingQuery: () => {},
  // showContent: true,
  // showLeftNavbar: true,
  // showRightNavbar: true,
  // isDarkTheme: false,
  // toggleTheme: () => {},
  // onToggleShowContent: () => {},
  // onToggleShowLeftNavbar: () => {},
  // onToggleShowRightNavbar: () => {},
})

export default ConfigurationContext
