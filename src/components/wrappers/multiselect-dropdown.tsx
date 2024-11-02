import { MultiselectDropdownProps } from '@/@types/common'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '../ui/multi-select.component'

function MultiselectDropdown({
  itemValue,
  value,
  setValue,
  multiSelectorPlaceholder = 'Choose an option',
}: MultiselectDropdownProps) {
  // TODO needs logic improvements
  return (
    <MultiSelector
      values={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onValuesChange={(selectedValues: any) => {
        const updatedValues = selectedValues.reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any[], selectedValue: any) => {
            const existingItem = acc.find(
              (v) => String(v.value) === String(selectedValue.value)
            )
            if (existingItem) {
              return acc.filter((v) => v.value !== selectedValue)
            } else {
              const match = itemValue.find(
                (option) => option.value.value === selectedValue
              )
              if (match) {
                acc.push(match.value)
              }
              return acc
            }
          },
          [...value]
        )

        setValue(updatedValues)
      }}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder={multiSelectorPlaceholder} />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {itemValue.map((item) => (
            <MultiSelectorItem
              key={String(item.value.value)}
              value={String(item.value.value)}
            >
              {item.value.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  )
}

export default MultiselectDropdown
