import CommentTile from '../../../../app/javascript/react/components/CommentTile.js'

describe('CommentTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CommentTile
      key = '1'
      id = '1'
      body = "This is a comment"
      />
    )
  })

  it('should have a p tag', () => {
    expect(wrapper.find('p').length).toEqual(1)
  })

  it('should have expected content in p tag', () => {
    expect(wrapper.find('p').text()).toBe('This is a comment')
  })
})
