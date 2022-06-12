import { Base, Autobind } from '../Class/ProjectBaseClass'
import { Dragable } from '../Interfaces/IDragAndDrop'
import Project from '../Class/ProjectModel'

//#region ProjectItem
export default class ProjectItem extends Base<HTMLUListElement, HTMLLIElement>
  implements Dragable {
  get persons() {
    switch (this.project.people) {
      case 0:
        return `No persons`
      case 1:
        return `One person`
      default:
        return `${this.project.people} persons`
    }
  }

  constructor(hostId: string, private project: Project) {
    super('single-project', hostId, false, project.id)
    this.configure()
    this.renderContent()
  }
  protected configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dradEndHandler)
  }
  protected renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = `${this.persons} assgined`
    this.element.querySelector('p')!.textContent = this.project.description
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }
  @Autobind
  dradEndHandler(_: DragEvent): void {
    console.log()
  }
}
//#endregion
