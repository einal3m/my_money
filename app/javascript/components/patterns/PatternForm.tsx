import React, { useEffect } from 'react'

import { FormControl } from 'components/common/controls/NewFormControl'
import { Pattern } from 'types/models'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CategorySelect } from 'components/common/controls/CategorySelect'
import { SubcategorySelect } from 'components/common/controls/SubcategorySelect'

type PatternFormProps = {
  pattern: Pattern
  groupedCategories: GroupedCategories[]
  onSubmit: (pattern: Pattern) => void
}

export const PatternForm = (props: PatternFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Pattern>({ defaultValues: props.pattern })

  const onSubmit: SubmitHandler<Pattern> = (data) => {
    props.onSubmit(data)
  }

  const categoryId = watch('categoryId')

  return (
    <form id="modal-form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        name="matchText"
        label="Match Text"
        errorMessage={errors.matchText?.message}
      >
        <input
          id="matchText"
          className="form-control"
          {...register('matchText', { required: 'Match text is required.' })}
        />
      </FormControl>
      <FormControl
        name="notes"
        label="Notes"
        errorMessage={errors.notes?.message}
      >
        <input id="notes" className="form-control" {...register('notes')} />
      </FormControl>
      <FormControl
        name="categoryId"
        label="Category"
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
              onChange={(args) => {
                setValue('subcategoryId', 0)
                field.onChange(args)
              }}
            />
          )}
        />
      </FormControl>
      {categoryId && (
        <FormControl
          name="subcategoryId"
          label="Subcategory"
          errorMessage={errors.subcategoryId?.message}
        >
          <Controller
            name="subcategoryId"
            control={control}
            render={({ field }) => (
              <SubcategorySelect
                name="subcategoryId"
                value={field.value}
                allowUnassigned
                categoryId={categoryId}
                groupedCategories={props.groupedCategories}
                onChange={field.onChange}
              />
            )}
          />
        </FormControl>
      )}
    </form>
  )
}
