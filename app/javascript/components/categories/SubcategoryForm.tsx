import React from 'react'

import { FormControl } from 'components/common/controls/NewFormControl'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Subcategory, SubcategoryFormInput } from 'types/models'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { CategorySelect } from 'components/common/controls/CategorySelect'

type SubcategoryFormProps = {
  subcategory: Subcategory
  groupedCategories: GroupedCategories[]
  onSubmit: (data: SubcategoryFormInput) => void
}

export const SubcategoryForm = (props: SubcategoryFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubcategoryFormInput>({ defaultValues: props.subcategory })

  const onSubmit: SubmitHandler<SubcategoryFormInput> = (data) => {
    props.onSubmit(data)
  }

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        name="categoryId"
        label="Category Type"
        errorMessage={errors.categoryId?.message}
      >
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <CategorySelect
              name="categoryId"
              value={field.value}
              groupedCategories={props.groupedCategories}
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
