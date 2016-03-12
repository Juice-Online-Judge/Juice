export default {
  username: {
    presence: true,
    length: {
      maximum: 32
    }
  },
  password: {
    presence: true
  },
  passwordConfirm: {
    presence: true,
    equality: 'password'
  },
  email: {
    presence: true,
    email: true
  }
};
