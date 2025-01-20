export interface BaseEntity<T> {
  validate(data: Partial<T>): void
  create(data: Partial<T>): T
  mapToDTO(data: Partial<T>): Partial<T>
}
