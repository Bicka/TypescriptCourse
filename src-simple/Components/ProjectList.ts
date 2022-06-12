import { GlobalState } from '../Service/ProjectState'
import { Base, Autobind } from '../Class/ProjectBaseClass'
import { DragTarget } from '../Interfaces/IDragAndDrop'
import Project, { Status } from '../Class/ProjectModel'
import ProjectItem from './ProjectItem'

//#region ProjectList
export default class ProjectList extends Base<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignProject: Project[] = []
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)
    this.type = type
    GlobalState.addListener((projects: Project[]) => {
      this.assignProject = projects.filter((item) => {
        if (this.type === 'active') return item.status === Status.Active
        return item.status === Status.Finished
      })
      this.renderProjects()
    })
    this.renderContent()
    this.configure()
  }
  protected configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
  }
  protected renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector(
      'h2',
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`
  }

  private renderProjects() {
    const listId = `${this.type}-projects-list`
    const listEl = document.getElementById(listId)! as HTMLUListElement
    listEl.innerHTML = ''
    for (const item of this.assignProject) {
      new ProjectItem(listId, item)
    }
  }

  @Autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault()
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
  }
  @Autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }
  @Autobind
  dropHandler(event: DragEvent): void {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
    const projId = event.dataTransfer!.getData('text/plain')
    GlobalState.moveProject(
      projId,
      this.type === 'active' ? Status.Active : Status.Finished,
    )
  }
}

//#endregion
