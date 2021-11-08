export type AlertType = 'success' | 'warning' | 'danger'

export interface IAlert {
  text: string
  type: AlertType
}
