interface ISettings {
  showTagsView: boolean // Controls tagsview display
  showSidebarLogo: boolean // Controls siderbar logo display
  fixedHeader: boolean // If true, will fix the header component
  sidebarTextTheme: boolean // If true, will change active text color for sidebar based on theme
  theme: string
}

// You can customize below settings :)
const settings: ISettings = {
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: false,
  sidebarTextTheme: true,
  theme: '#fff'
}

export default settings
