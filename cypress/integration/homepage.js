const time = new Date()
const date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`

describe('homepage component test', () => {
  it('Should do below', () => {
    cy.visit('http://192.168.42.59:8080/')
      .request({
        method: 'GET',
        url: `/currency/historical/${date}`
      })
  })
})