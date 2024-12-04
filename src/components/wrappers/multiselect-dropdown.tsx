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
                               isSingleSelect = false, // New prop with default false for backward compatibility
                             }: MultiselectDropdownProps) {
  return (
      <MultiSelector
          values={value}
          onValuesChange={(selectedValues: any) => {
            let updatedValues = selectedValues.map((selectedValue: any) => {
              if (typeof selectedValue == 'string') {
                const match = itemValue.find(
                    (option) => option.value.value === selectedValue
                )

                if (match) {
                  return match.value
                }
                return null;
              } else {
                return selectedValue
              }
            })
            updatedValues = updatedValues.filter((v: any) => v !== null);

            // Only take last value if isSingleSelect is true
            if (isSingleSelect && updatedValues.length > 0) {
              updatedValues = [updatedValues[updatedValues.length - 1]];
            }

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