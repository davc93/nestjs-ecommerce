import { type Express } from 'express'
import request, { type SuperTest, type Test } from 'supertest'

import { createApp } from '../src/app'
describe('test', () => {
  let app: Express | null = null
  let server: any = null
  let api: SuperTest<Test> | null = null
  beforeAll(async () => {
    app = await createApp()
    server = app.listen(9000)
    api = request(app)
  })
  describe('POST notification_url', () => {
    test('should be statusCode 200', async () => {
      // arrange
      const message = {
        payer: 'Diego',
        type: 'payment'
      }
      // act
      const response: any = await api?.post('/api/notification_url')
      // assertion

      expect(response.statusCode).toBe(200)
    })
  })
  afterAll(() => {
    server.close()
  })
})
