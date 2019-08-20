export type registerNavigationProps = {
  navigator: any,
  selectTab(selectedTabIndex: number): void,
  reselectTab(): void,
  setNavigator(navigator: any): void,
}

export type AppBarButton = {
  id: string,
  name: string,
  icon: any
}
