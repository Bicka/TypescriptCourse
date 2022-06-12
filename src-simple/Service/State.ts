export type Listener<T> = (items: T[]) => void
export default class State<T> {
  protected listener: Listener<T>[] = []
  constructor() {}
  addListener(listenerFn: Listener<T>) {
    this.listener.push(listenerFn)
  }
}
