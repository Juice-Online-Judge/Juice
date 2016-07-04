# Account Api

### /api/account/profile

- Method: Get
- Authorized: True
- Rate Limit: None
- Parameters: None
- Response
  - Success
    - Code: 200
    - Content: {id: integer, username: string, nickname: string, email: string, roles: array}
      - roles: {id: integer, name: string, pivot: object}
    
### /api/account/profile

- Method: Patch
- Authorized: True
- Rate Limit: None
- Parameters
  - nickname: required, string, length between 3 to 16
  - email: required, string, max length 48
- Response
  - Success
    - Code: 200
    - Content: {id: integer, username: string, nickname: string, email: string}

### /api/account/password

- Method: Patch
- Authorized: True
- Rate Limit: None
- Parameters
  - old_password: required, string, min length 6
  - new_password: required, string, min length 6, different than old_password field, confirmed
- Response
  - Success
    - Code: 204
    - Content: None
  - Failed
    - Code: 422
    - Content: {errors: object, message: string, status_code: integer}
  - Failed
    - Code: 412
    - Content: {message: string, status_code: integer}
  - Error
    - Code: 500
    - Content: {message: string, status_code: integer}
        
### /api/account/submissions

- Method: Get
- Authorized: True
- Rate Limit: None
- Parameters: None
- Response
  - Success
    - Code: 200
    - Content: {submissions: array}
      - submissions: {id: integer, language: string, submitted_at: string, judge: object, question: object}

#### Last Update: 2016/07/04
