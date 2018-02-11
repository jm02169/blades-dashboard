import NewClockFormContainer from '../../../../app/javascript/react/containers/NewClockFormContainer.js'
//
describe('NewClockFormContainer', () => {
  let wrapper;
  beforeEach(() => {

    const params = { id: '1'}
    wrapper = shallow(
      <NewClockFormContainer
        params = {params}
      />
    )
    wrapper.setProps()
  })
//
//   it('should have a header that says "Add a new clock"', () => {
//     expect(wrapper.find('h2').length).toEqual(1)
//     expect(wrapper.find('h2').text()).toBe("Add a new clock")
//   })
//   it('has a form element', () => {
//     expect(wrapper.find('form').length).toEqual(1)
//   })
//   it('contains a field name "Name" and an "Name" input field', () => {
//     const label = wrapper.findWhere(n => n.text() === "Name")
//     expect(label.length).toEqual(1)
//     const labelContents = label.children()
//     expect(labelContents.length).toEqual(1)
//     expect(labelContents.type()).toEqual("input")
//     expect(labelContents.node.value).toEqual("")
//     labelContents.node.value = "Clock One"
//     labelContents.simulate("change",labelContents)
//     expect(labelContents.node.value).toEqual("Clock One")
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).not.toContain("Name is required")
//
//   })
//   it('contains a field name "Description" and an "Description" input field', () => {
//     const label = wrapper.findWhere(n => n.text() === "Description")
//     expect(label.length).toEqual(1)
//     const labelContents = label.children()
//     expect(labelContents.length).toEqual(1)
//     expect(labelContents.type()).toEqual("input")
//     expect(labelContents.node.value).toEqual("")
//
//   })
//   it('contains a field name "Segments" and an "Segments" input field', () => {
//     const label = wrapper.findWhere(n => n.text() === "Segments")
//     expect(label.length).toEqual(1)
//     const labelContents = label.children()
//     expect(labelContents.length).toEqual(1)
//     expect(labelContents.type()).toEqual("input")
//     expect(labelContents.node.value).toEqual("")
//     labelContents.node.value = "yay"
//     expect(labelContents.node.value).toEqual("")
//     labelContents.node.value = "2"
//     labelContents.simulate("change",labelContents)
//     expect(labelContents.node.value).toEqual("2")
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).not.toContain("Number of segments is required")
//   })
//   it('contains a field name "Starting ticks" and an input field', () => {
//     const label = wrapper.findWhere(n => n.text() === "Starting ticks")
//     expect(label.length).toEqual(1)
//     const labelContents = label.children()
//     expect(labelContents.length).toEqual(1)
//     expect(labelContents.type()).toEqual("input")
//     expect(labelContents.node.value).toEqual("0")
//     labelContents.node.value = "yay"
//     expect(labelContents.node.value).toEqual("")
//     labelContents.node.value = "2"
//     labelContents.simulate("change",labelContents)
//     expect(labelContents.node.value).toEqual("2")
//
//   })
//   it('contains a submit button', () => {
//     const submit = wrapper.findWhere(n => n.node.value === "Submit")
//     expect(submit.length).toEqual(1)
//     expect(submit.type()).toEqual("button")
//
//   })
//
//   it('contains select field', () => {
//     expect(wrapper.findWhere(n => n.node.type ==='select').length).toEqual(1)
//   })
//
//   it('gives an error when Name is blank',() => {
//
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).toContain("Name is required")
//   })
//   it('gives an error when description is blank',() => {
//
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).toContain("Description is required")
//   })
//
//   it('gives an error when segments is blank',() => {
//
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).toContain("Number of segments is required")
//   })
//
//
//
//   it('gives an error when ticks is greater than segments',() => {
//     const label = wrapper.findWhere(n => n.text() === "Segments")
//     const labelContents = label.children()
//     labelContents.node.value = "6"
//     labelContents.simulate("change", labelContents)
//     const label2 = wrapper.findWhere(n => n.text() === "Starting ticks")
//     const labelContents2 = label2.children()
//     labelContents2.node.value = "7"
//     labelContents2.simulate("change", labelContents2)
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).toContain("Number of ticks can't exceed number of segments")
//   })
//
//   it('gives an error when segments is less than 4', () => {
//     const label = wrapper.findWhere(n => n.text() === "Segments")
//     const labelContents = label.children()
//     labelContents.node.value = "2"
//     labelContents.simulate("change", labelContents)
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).toContain("Number of segments must be between 4 and 12")
//   })
//
//   it('gives an error when segments is greater than 12', () => {
//     const label = wrapper.findWhere(n => n.text() === "Segments")
//     const labelContents = label.children()
//     labelContents.node.value = "22"
//     labelContents.simulate("change", labelContents)
//     const form = wrapper.find('form')
//     form.simulate('submit')
//     expect(wrapper.text()).toContain("Number of segments must be between 4 and 12")
//   })
})
