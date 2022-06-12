import State from './State'
import Project, { Status } from '../Class/ProjectModel'
export class ProjectState extends State<Project> {
  private static thisInstance: ProjectState
  private projects: Project[] = []
  private constructor() {
    super()
  }
  static getInstance() {
    if (this.thisInstance) return this.thisInstance
    this.thisInstance = new ProjectState()
    return this.thisInstance
  }
  addProject(input: [string, string, number]) {
    const newProject = new Project(input[0], input[1], input[2])
    this.projects.push(newProject)
    for (const listenerFn of this.listener) {
      listenerFn(this.projects.slice())
    }
    //console.log(this.projects)
  }
  moveProject(prjId: string, newStatus: Status) {
    const proj = this.projects.find((item) => item.id == prjId)
    if (proj && proj.status != newStatus) {
      proj.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
    for (const list of this.listener) {
      list(this.projects.slice())
    }
  }
}
export const GlobalState = ProjectState.getInstance()
