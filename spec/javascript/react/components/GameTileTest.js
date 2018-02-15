import GameTile from '../../../../app/javascript/react/components/GameTile.js'

describe('GameTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <GameTile
        name="Game One"
        description="This is a description"
      />
    )
  })

  it('should have an h2 tag', () => {
    expect(wrapper.find('h2').length).toEqual(1)
  })

  it('should have expected content in h2 tag', () => {
    expect(wrapper.find('h2').text()).toBe('Game One')
  })

  it('should have a p tag', () => {
    expect(wrapper.find('p').length).toEqual(1)
  })

  it('should have expected content in h6 tag', () => {
    expect(wrapper.find('p').text()).toBe('Description: This is a description')
  })
})
