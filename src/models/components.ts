export interface AlertProps {
  isVisible: boolean,
  message: string,
  variant: 'default' | 'success' | 'alert' | 'error'
}