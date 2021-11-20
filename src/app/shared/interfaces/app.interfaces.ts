import { AlertType } from '../../admin/shared/components/alert/alert-types'

export interface UserInterface {
  email: string
  password: string
  returnSecureToken: boolean | null
}

export interface PostInterface {
  id: string | null
  title: string
  author: string
  text: string
  date: Date
}

export interface FbAuthResponseInterface {
  idToken: string | null
  expiresIn: string
}

export interface FbCreateResponseInterface {
  name: string
}

export interface AlertInterface {
  text: string
  type: AlertType
}
