import {object, string, ref} from 'yup'

export default object().shape({
  username: string().max(24).min(5).required(),
  nickname: string().max(16).min(5).required(),
  password: string().min(6).required(),
  passwordConfirm: string().sameAs(ref('password')).required(),
  email: string().max(48).email().required()
})
