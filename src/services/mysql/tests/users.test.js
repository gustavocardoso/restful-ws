const test = require('ava')
const { connection, errorHandler } = require('./setup')
const users = require('../users')({ connection, errorHandler })

const create = () => users.save('user@test.com', '123456')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('List users', async t => {
  await create()
  const list = await users.all()
  t.is(list.users.length, 1)
  t.is(list.users[0].email, 'user@test.com')
})

test('Create user', async t => {
  const result = await create()
  t.is(result.user.email, 'user@test.com')
  t.is(result.user.password, '123456')
})

test('Edit user', async t => {
  await create()
  const updated = await users.update(1, '987654')
  t.is(updated.user.password, '987654')
  t.is(updated.affectedRows, 1)
})

test('Delete user', async t => {
  await create()
  const deleted = await users.del(1)
  t.is(deleted.affectedRows, 1)
})
