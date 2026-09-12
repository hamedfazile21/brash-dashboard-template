import ReactSelect, {
  components,
  type ClassNamesConfig,
  type DropdownIndicatorProps,
  type ClearIndicatorProps,
  type OptionProps,
  type GroupBase,
  type Props as ReactSelectProps,
  type NoticeProps,
} from 'react-select'
import { Check, ChevronDown, SearchX, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps<
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
> extends Omit<
  ReactSelectProps<Option, IsMulti, GroupBase<Option>>,
  'classNames' | 'unstyled'
> {
  label?: string
  error?: string
  required?: boolean
}

const glassClassNames: ClassNamesConfig<
  SelectOption,
  boolean,
  GroupBase<SelectOption>
> = {
  control: (state) =>
    `glass-solid flex rounded-md px-2 py-1 text-sm transition-all duration-200 cursor-pointer ${
      state.isFocused ? 'border-primary/50 ring-2 ring-primary/30' : ''
    }`,
  placeholder: () => 'text-muted',
  singleValue: () => 'text-foreground',
  input: () => 'text-foreground',
  valueContainer: () => 'gap-x-1',
  indicatorSeparator: () => 'hidden',
  indicatorsContainer: () => 'gap-x-1',
  clearIndicator: () =>
    'text-muted hover:text-red-500 transition-colors cursor-pointer p-1',
  dropdownIndicator: () => 'text-muted p-1',
  menu: () =>
    `z-50 mt-2 rounded-xl border border-black/8 bg-surface/90 p-1 shadow-lg shadow-black/5
     backdrop-blur-xl backdrop-saturate-150
     dark:border-white/10 dark:bg-surface/80 dark:shadow-black/20`,

  menuPortal: () => 'z-[9999]',
  menuList: () => 'space-y-0.5 max-h-60 overflow-y-auto scrollbar-thin',

  groupHeading: () =>
    'px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted first:pt-0.5',

  group: () =>
    'border-t border-borderColor/50 pt-1 first:border-t-0 first:pt-0',
  option: (state) =>
    `flex items-center justify-between rounded-lg px-3 py-2 text-sm cursor-pointer! transition-colors duration-150 opacity-100 ${
      state.isSelected
        ? 'bg-primary/15 text-primary'
        : state.isFocused
          ? 'bg-surface-hover text-foreground'
          : 'text-foreground hover:bg-surface-hover'
    } ${
      state.isDisabled
        ? 'opacity-50 cursor-not-allowed hover:bg-transparent'
        : ''
    }`,
  noOptionsMessage: () => 'px-3 py-2 text-sm text-muted',
  loadingMessage: () => 'px-3 py-2 text-sm text-muted',
  multiValue: () =>
    'flex items-center gap-x-1 rounded-md bg-primary/15 pl-2 pr-1 py-0.5',
  multiValueLabel: () => 'text-xs font-medium text-primary',
  multiValueRemove: () =>
    'text-primary hover:text-red-500 transition-colors cursor-pointer rounded-sm',
}

function DropdownIndicator(
  props: DropdownIndicatorProps<SelectOption, boolean, GroupBase<SelectOption>>,
) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown
        size={16}
        className={`transition-transform duration-200 ${props.selectProps.menuIsOpen ? 'rotate-180' : ''}`}
      />
    </components.DropdownIndicator>
  )
}

function ClearIndicator(
  props: ClearIndicatorProps<SelectOption, boolean, GroupBase<SelectOption>>,
) {
  return (
    <components.ClearIndicator {...props}>
      <X size={14} />
    </components.ClearIndicator>
  )
}

function OptionWithCheck(
  props: OptionProps<SelectOption, boolean, GroupBase<SelectOption>>,
) {
  return (
    <components.Option {...props}>
      <div className="w-full flex items-center justify-between">
        <span className="truncate text-sm">{props.label}</span>
        {props.isSelected && (
          <Check size={15} className="shrink-0 text-primary" />
        )}
      </div>
    </components.Option>
  )
}

function NoOptionsFound(
  props: NoticeProps<SelectOption, boolean, GroupBase<SelectOption>>,
  t: TFunction,
) {
  return (
    <components.NoOptionsMessage {...props}>
      <div className="flex flex-col items-center justify-center gap-y-2 py-4 text-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/10">
          <SearchX size={16} className="text-muted" />
        </div>
        <p className="text-sm font-medium text-foreground">
          {t('No results found')}
        </p>
        <p className="text-xs text-muted">{t('Try a different search term')}</p>
      </div>
    </components.NoOptionsMessage>
  )
}

function InputSelect<
  Option extends SelectOption = SelectOption,
  IsMulti extends boolean = false,
>({
  label,
  error,
  id,
  components: customComponents,
  required = false,
  ...props
}: SelectProps<Option, IsMulti>) {
  const { t } = useTranslation()
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          {label}{' '}
          {required && (
            <span className="text-red-500 ltr:ml-0.5 rtl:mr-0.5">*</span>
          )}
        </label>
      )}

      <ReactSelect<Option, IsMulti, GroupBase<Option>>
        inputId={id}
        unstyled
        menuPortalTarget={
          typeof document !== 'undefined' ? document.body : undefined
        }
        classNames={
          glassClassNames as ClassNamesConfig<
            Option,
            IsMulti,
            GroupBase<Option>
          >
        }
        components={{
          DropdownIndicator: DropdownIndicator as any,
          ClearIndicator: ClearIndicator as any,
          Option: OptionWithCheck as any,
          NoOptionsMessage: (props: any) => NoOptionsFound(props, t) as any,
          ...customComponents,
        }}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default InputSelect
