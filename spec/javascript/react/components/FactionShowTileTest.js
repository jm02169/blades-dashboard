import FactionShowTile from '../../../../app/javascript/react/components/FactionShowTile.js'

describe('FactionShowTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FactionShowTile
      key = '1'
      id = '1'
      name = "Faction One"
      description = "This is a faction description"
      factionStatus = "-3"
      />
    )
  })

  it('should have three a tags', () => {
    expect(wrapper.find('a').length).toEqual(3)
  })
  it('should have two i tags', () => {
    expect(wrapper.find('i').length).toEqual(2)
  })
  it('should have the name in the first a tag', () => {
    expect(wrapper.find('a').at(0).text()).toBe("Faction One")
  })
})
