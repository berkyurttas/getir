const request = require('supertest')
const app = require('../server')

describe('/GET /records', () => {
  it('should not allow', async () => {
    const res = await request(app)
      .get('/records')
    expect(res.body.code).toEqual(405)
  })
})

describe('/POST /records', () => {
    it('should return 422 if params empty', async () => {
      const res = await request(app)
        .post('/records')
      expect(res.body.code).toEqual(422)
    })
    it('should return 0 if all params are well formatted', async () => {
        const res = await request(app)
          .post('/records')
          .send({
            "startDate": "2017-01-01",
            "endDate": "2020-11-01",
            "minCount":2000,
            "maxCount":3000
          })
        expect(res.body.code).toEqual(0)
      })
  })