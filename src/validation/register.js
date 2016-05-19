export default {
  username: {
    presence: true,
    length: {
      maximum: 24,
      minimum: 5
    }
  },
  nickname: {
    presence: true,
    length: {
      maximum: 16,
      minimum: 5
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6
    }
  },
  passwordConfirm: {
    presence: true,
    equality: 'password'
  },
  email: {
    presence: true,
    email: true,
    length: {
      maximum: 48
    }
  }
};
