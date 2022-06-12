export interface Dragable {
  dragStartHandler(event: DragEvent): void
  dradEndHandler(event: DragEvent): void
}
export interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}
