import NpcShowTile from '../../../../app/javascript/react/components/NpcShowTile.js'

describe('NpcShowTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <NpcShowTile
      key = '1'
      id = '1'
      name = 'NPC One'
      factionName = '-3'
      />
    )
  })

  it('should have two a tag', () => {
    expect(wrapper.find('a').length).toEqual(2)
  })
  it('should have the name in the first a tag', () => {
    expect(wrapper.find('a').at(0).text()).toBe("NPC One")
  })
})
