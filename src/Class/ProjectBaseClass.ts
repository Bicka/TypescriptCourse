//#region Decorators
export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMehod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMehod.bind(this)
      return boundFn
    },
  }
  return adjDescriptor
}
//#endregion
export abstract class Base<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U

  constructor(
    templateId: string,
    hostId: string,
    insertAtStart: boolean,
    newElId?: string,
  ) {
    this.templateElement = document.getElementById(
      templateId,
    )! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostId) as T

    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U
    if (newElId && this.element) {
      this.element.id = newElId
    }
    this.attach(insertAtStart)
  }
  protected attach(atStart: boolean) {
    if (atStart)
      this.hostElement.insertAdjacentElement('beforebegin', this.element)
    else this.hostElement.insertAdjacentElement('beforeend', this.element)
  }
  protected abstract configure(): void
  protected abstract renderContent(): void
}
