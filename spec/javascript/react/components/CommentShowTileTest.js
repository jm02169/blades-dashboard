import CommentShowTile from '../../../../app/javascript/react/components/CommentShowTile.js'

describe('CommentShowTile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CommentShowTile
      key = '1'
      commentBody = 'This is a comment'
      />
    )
  })

  it('should have an li tag', () => {
    expect(wrapper.find('li').length).toEqual(1)
  })

  it('should have expected content in li tag', () => {
    expect(wrapper.find('li').text()).toBe('This is a comment')
  })
})
