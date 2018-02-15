import ClockShowTile from '../../../../app/javascript/react/components/ClockShowTile.js'

describe('ClockShowTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ClockShowTile
      key = '1'
      id = '1'
      name = "Clock Name"
      description = "This is a description"
      ticks = '7'
      segments = '8'
      factionName = "The Bloodletters"
      npcName = {null}
      factionId = '2'
      npcId = {null}
      />
    )
  })

  it('should have a span tag', () => {
    expect(wrapper.find('span').length).toEqual(3)
  })
})
