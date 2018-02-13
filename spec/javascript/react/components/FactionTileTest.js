import FactionTile from '../../../../app/javascript/react/components/FactionTile.js'

describe('FactionTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FactionTile
      key = '1'
      id = '1'
      />
    )
  })

  it('should have an h3 tag', () => {
    expect(wrapper.find('h3').length).toEqual(1)
  })

  it('should have expected content in h3 tag', () => {
    expect(wrapper.find('h3').text()).toBe('Factions')
  })
})
