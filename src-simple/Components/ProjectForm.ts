import { GlobalState } from '../Service/ProjectState'
import { FormInputs } from '../Interfaces/IFormInputs'
import { Base, Autobind } from '../Class/ProjectBaseClass'
import { validateInput } from '../Interfaces/IValidateInputs'

export default class ProjectForm extends Base<HTMLDivElement, HTMLFormElement> {
  titleInputElemnt: HTMLInputElement
  descriptionInputElemnt: HTMLInputElement
  peopleInputElemnt: HTMLInputElement
  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElemnt = this.element.querySelector(
      '#title',
    )! as HTMLInputElement
    this.descriptionInputElemnt = this.element.querySelector(
      '#description',
    )! as HTMLInputElement
    this.peopleInputElemnt = this.element.querySelector(
      '#people',
    )! as HTMLInputElement

    this.configure()
  }
  protected renderContent(): void {}

  protected configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }
  private gatherUserInput(): [string, string, number] | null {
    const formInputs: FormInputs = {
      title: {
        value: this.titleInputElemnt.value,
        required: true,
        minLength: 1,
      },
      desc: {
        value: this.descriptionInputElemnt.value,
        required: true,
        minLength: 1,
      },
      people: {
        value: +this.peopleInputElemnt.value,
        required: true,
        min: 0,
        max: 10,
      },

      validateThisForm() {
        return (
          validateInput(this.title) &&
          validateInput(this.desc) &&
          validateInput(this.people)
        )
      },
    }

    if (!formInputs.validateThisForm()) {
      alert('Invalid input')
      return null
    } else {
      this.clearInputs()
      return [
        formInputs.title.value as string,
        formInputs.desc.value as string,
        formInputs.people.value as number,
      ]
    }
  }

  private clearInputs(): void {
    this.titleInputElemnt.value = ''
    this.descriptionInputElemnt.value = ''
    this.peopleInputElemnt.value = ''
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (userInput) GlobalState.addProject(userInput)
  }
}
