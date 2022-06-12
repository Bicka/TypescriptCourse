import { ValidInput } from './IValidateInputs'

export interface FormInputs {
  title: ValidInput
  desc: ValidInput
  people: ValidInput

  validateThisForm(): boolean
}
