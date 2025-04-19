import React from 'react'

import { FormControl } from 'components/common/controls/NewFormControl'
import Select from 'components/common/controls/Select'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Category, CategoryFormInput, CategoryType } from 'types/models'

type CategoryFormProps = {
  category: Category
  categoryTypes: CategoryType[]
  onSubmit: (data: CategoryFormInput) => void
}

export const CategoryForm = (props: CategoryFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInput>({ defaultValues: props.category })

  const onSubmit: SubmitHandler<CategoryFormInput> = (data) => {
    props.onSubmit(data)
  }

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        name="categoryTypeId"
        label="Category Type"
        errorMessage={errors.categoryTypeId?.message}
      >
        <Controller
          name="categoryTypeId"
          control={control}
          rules={{ required: 'Category type is required' }}
          render={({ field }) => (
            <Select
              name="categoryTypeId"
              value={field.value}
              options={props.categoryTypes}
              onChange={field.onChange}
            />
          )}
        />
      </FormControl>
      <FormControl name="name" label="name" errorMessage={errors.name?.message}>
        <input
          id="name"
          className="form-control"
          {...register('name', { required: 'Name is required.' })}
        />
      </FormControl>
    </form>
  )
}
