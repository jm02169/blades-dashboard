import ListItem from '../../../../app/javascript/react/components/ListItem.js'

describe('ListItem', () => {
  let wrapper;

  beforeEach(() => {
    let id = 42
    wrapper = mount(
      <ListItem
        name="Faction One"
        identifier="fac_"
        id={id}
      />
    )
  })


  it('should have an option tag', () => {
    expect(wrapper.find('option').length).toEqual(1)
  })

  it('should have expected content in h2 tag', () => {
    expect(wrapper.find('option').text()).toBe('Faction One')
  })

  it('should have expected value in option', () => {
    expect(wrapper.find('option').node.value).toBe("fac_42")
  })

})
