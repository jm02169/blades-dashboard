import NpcShowTile from '../../../../app/javascript/react/components/NpcShowTile.js'

describe('NpcShowTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <NpcShowTile
      key = '1'
      id = '1'
      name = 'NPC One'
      faction = '-3'
      />
    )
  })

  it('should have one a tag', () => {
    expect(wrapper.find('a').length).toEqual(1)
  })
  it('should have the name in the first a tag', () => {
    expect(wrapper.find('a').at(0).text()).toBe("NPC One")
  })
})
