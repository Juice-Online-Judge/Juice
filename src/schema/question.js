import { schema } from 'normalizr'

const question = new schema.Entity('question', { idAttribute: 'uuid' })

export default question
