import request from 'supertest'
import { app } from '../../app'

it('Postの一覧を取得できるっぽい', async () => {
  await request(app).get('/api/node/posts').send().expect(200)
})

it('postを投稿できるっぽい', async () => {
  await request(app)
    .post('/api/node/posts')
    .send({
      title: 'fugafuga',
    })
    .expect(201)
})
