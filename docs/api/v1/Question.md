# Question Api

### /api/questions

- Method: Get
- Authorized: False
- Role: None
- Rate Limit: None
- Parameters: None
- Response
  - Success
    - Code: 200
    - Content: Pagination
      - data: {uuid: string, title: string, tags: array}

### /api/questions

- Method: Post
- Authorized: True
- Role: teacher, ta
- Rate Limit: None
- Parameters
  - uuid: string, max length 36
  - title: required, string, max length 96
  - description: required, string, max length 3500
  - input: required, object
    - textarea: required without file, string
    - file: required without textarea, text file 
  - output: required, object
    - textarea: required without file, string
    - file: required without textarea, text file
  - argument: array
    - element: string
  - restriction: required, object
    - time: required, numeric, min 1
    - memory: required, numeric, min 5
    - file: required, integer, min 0
    - library: array
      - element: string
  - public: required, boolean
  - tag: array
    - element: integer
- Response
  - Success
    - Code: 200
    - Content: {uuid: string, title: string, description: string, judge: object, created_at: string, updated_at: string, tags: array}
      - judge: {restriction: object}
      - tags: {id: integer, name: string, pivot: object}
  - Failed
    - Code: 422
    - Content: {errors: object, message: string, status_code: integer}
  - Error
    - Code: 500
    - Content: {message: string, status_code: integer}

### /api/questions/{uuid}

- Method: Get
- Authorized: False
- Role: None
- Rate Limit: None
- Parameters
  - uuid: required, string
- Response
  - Success
    - Code: 200
    - Content: {uuid: string, title: string, description: string, judge: object, created_at: string, updated_at: string, tags: array}
      - judge: {restriction: object}
      - tags: {id: integer, name: string, pivot: object}
  - Error
    - Code: 404
    - Content: {message: string, status_code: integer}

#### Last Update: 2016/07/05
