import CommentTile from '../../../../app/javascript/react/components/CommentTile.js'

describe('CommentTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CommentTile
      key = '1'
      id = '1'
      />
    )
  })

  it('should have an h3 tag', () => {
    expect(wrapper.find('h3').length).toEqual(1)
  })

  it('should have expected content in h3 tag', () => {
    expect(wrapper.find('h3').text()).toBe('Comments')
  })
})
