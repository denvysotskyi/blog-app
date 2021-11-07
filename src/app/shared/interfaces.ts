export interface IUser {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface IFbAuthResponse {
  idToken: string | null
  expiresIn: string
}

export interface IPost {
  title: string
  author: string
  text: string
  date: Date
}

export interface IFbCreateResponse {
  name: string
}
