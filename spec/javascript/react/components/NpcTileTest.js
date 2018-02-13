import NpcTile from '../../../../app/javascript/react/components/NpcTile.js'

describe('NpcTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <NpcTile
      key = '1'
      id = '1'
      />
    )
  })

  it('should have an h3 tag', () => {
    expect(wrapper.find('h3').length).toEqual(1)
  })

  it('should have expected content in h3 tag', () => {
    expect(wrapper.find('h3').text()).toBe('NPCs')
  })
})
