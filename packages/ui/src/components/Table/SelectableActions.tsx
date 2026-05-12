import { Transition, TransitionChild } from '@headlessui/react'

import {
  CheckboxField,
  FieldValues,
  Form,
  Label,
  UseFormReturn,
} from '@redwoodjs/forms'

export interface ISelectableActions {
  onDuplicate: (selected: number[]) => void
  onDelete: (selected: number[]) => void
}

export interface SelectableActionsProps<T extends FieldValues>
  extends ISelectableActions {
  children: React.ReactNode
  formMethods: UseFormReturn<T>
  hasSelection: boolean
}

const SelectableActions = <T extends FieldValues>({
  children,
  onDuplicate,
  onDelete,
  hasSelection,
  formMethods,
}: SelectableActionsProps<T>) => {
  const onDuplicateSubmit = formMethods.handleSubmit((data) => {
    onDuplicate(data.item.map((i: string) => parseInt(i, 10)))
  })
  const onDeleteSubmit = formMethods.handleSubmit((data) => {
    onDelete(data.item.map((i: string) => parseInt(i, 10)))
  })
  return (
    <Form formMethods={formMethods as UseFormReturn}>
      <div className="flex gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <CheckboxField
            name="selectAll"
            className="accent-primary-500 cursor-pointer"
          />
          <Label
            name="selectAll"
            className="hover:text-gray-800 cursor-pointer select-none"
          >
            Seleccionar todo
          </Label>
        </div>
        <Transition
          show={hasSelection}
          children={
            <div className="flex gap-4">
              <TransitionChild
                appear={true}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-5 opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-in-out duration-300 transform delay-100"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-5 opacity-0"
              >
                <button
                  onClick={onDuplicateSubmit}
                  className="inline-flex gap-2 text-blue-500 hover:text-blue-700"
                >
                  Duplicar selección
                  <i className="material-symbols-outlined">content_copy</i>
                </button>
              </TransitionChild>
              <TransitionChild
                appear={true}
                enter="transition ease-in-out duration-300 transform delay-100"
                enterFrom="-translate-x-5 opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-5 opacity-0"
              >
                <button
                  onClick={onDeleteSubmit}
                  className="inline-flex gap-2 text-red-500 hover:text-red-700"
                >
                  Eliminar selección
                  <i className="material-symbols-outlined">delete</i>
                </button>
              </TransitionChild>
            </div>
          }
        ></Transition>
      </div>
      {children}
    </Form>
  )
}

export default SelectableActions
