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
  describe('GET hello world', () => {
    test('should be statusCode 200', async () => {
      // arrange

      // act
      const response: any = await api?.get('/')
      // assertion

      expect(response.statusCode).toBe(200)
    })
  })
  afterAll(() => {
    server.close()
  })
})
