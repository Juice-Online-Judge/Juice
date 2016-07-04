# Auth Api

### /api/auth/sign-in

- Method: Post
- Authorized: False
- Rate Limit: 5 req/m
- Parameters
  - username: required
  - password: required
- Response
  - Success
    - Code: 200
    - Content: token: string
  - Failed
    - Code: 422
    - Content: {message: string, status_code: integer}
    
### /api/auth/sign-out

- Method: Get
- Authorized: True
- Rate Limit: None
- Parameters: None
- Response
  - Success
    - Code: 204
    - Content: None
    
### /api/auth/sign-up

- Method: Post
- Authorized: False
- Rate Limit: None
- Parameters
  - username: required, string(alpha and num), length between 5 to 32
  - password: required, string, min length 6, different than username field, confirmed
  - email: required, string, max length 48
  - nickname: required, string, length between 3 to 16
- Response
  - Success
    - Code: 200
    - Content: token: string
  - Failed
    - Code: 422
    - Content: {errors: object, message: string, status_code: integer}
  - Error
    - Code: 500
    - Content: {message: string, status_code: integer}

### /api/auth/sign-up/validate

- Method: Get
- Authorized: False
- Rate Limit: None
- Parameters
  - field: required
  - value: required
- Response
  - Success
    - Code: 202
    - Content: None
  - Failed
    - Code: 422
    - Content: {errors: object, message: string, status_code: integer}
  - Error
    - Code: 405
    - Content: {message: string, status_code: integer}

#### Last Update: 2016/07/04
