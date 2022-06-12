export enum Status {
  Active,
  Finished,
}
export default class Project {
  id: string
  status: Status = Status.Active
  constructor(
    public title: string,
    public description: string,
    public people: number,
  ) {
    this.id = (+Math.random().toFixed(3) * 1000).toString()
  }
}
