# Account Api

### /api/roles

- Method: Get
- Authorized: True
- Role: teacher, ta
- Rate Limit: None
- Parameters: None
- Response
  - Success
    - Code: 200
    - Content: {roles: array}
      - roles: {id: integer, name: string}

### /api/roles

- Method: Post
- Authorized: True
- Role: teacher, ta
- Rate Limit: None
- Parameters
  - name: required, string, max length 32, must begin with 'custom-'
  - remark: string, max length 190
- Response
  - Success
    - Code: 200
    - Content: {role: {id: integer, name: string, remark: string|null}}
  - Failed
    - Code: 422
    - Content: {errors: object, message: string, status_code: integer}
  - Error
    - Code: 500
    - Content: {message: string, status_code: integer}

### /api/roles/{id}

- Method: Patch
- Authorized: True
- Role: teacher
- Rate Limit: None
- Parameters
  - name: required, string, max length 32, must begin with 'custom-'
  - remark: string, max length 190
- Response
  - Success
    - Code: 200
    - Content: {role: {id: integer, name: string, remark: string|null}}
  - Failed
    - Code: 403
    - Content: {message: string, status_code: integer}
  - Failed
    - Code: 404
    - Content: {message: string, status_code: integer}
  - Failed
    - Code: 422
    - Content: {errors: object, message: string, status_code: integer}
  - Error
    - Code: 500
    - Content: {message: string, status_code: integer}

### /api/roles/search

- Method: Get
- Authorized: True
- Role: teacher, ta
- Rate Limit: None
- Parameters
  - key: required, string
- Response
  - Success
    - Code: 200
    - Content: {roles: array}
      - roles: {id: integer, name: string}

#### Last Update: 2016/07/05
