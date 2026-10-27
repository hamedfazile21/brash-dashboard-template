import { useId } from 'react'
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
import { FieldLabel, FieldMessage } from './field'

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
  /** Helper text under the field, replaced by `error` when set */
  hint?: string
  required?: boolean
}

const glassClassNames: ClassNamesConfig<
  SelectOption,
  boolean,
  GroupBase<SelectOption>
> = {
  // Same height, hover, focus and error look as `.input`. The error flag
  // comes from the `aria-invalid` prop InputSelect passes through.
  control: (state) => {
    const invalid = state.selectProps['aria-invalid'] === true
    return `glass-solid flex min-h-9.5 rounded-md ps-3 pe-1.5 py-1 text-sm transition-all duration-200 ${
      state.isDisabled
        ? 'cursor-not-allowed bg-surface-hover/60 opacity-70'
        : 'cursor-pointer'
    } ${
      invalid
        ? `border-danger! ${state.isFocused ? 'ring-2 ring-danger/25' : ''}`
        : state.isFocused
          ? 'border-primary/50 ring-2 ring-primary/30'
          : state.isDisabled
            ? ''
            : 'hover:border-primary/30'
    }`
  },
  placeholder: () => 'text-muted',
  singleValue: () => 'text-foreground',
  input: () => 'text-foreground',
  valueContainer: () => 'gap-1',
  indicatorSeparator: () => 'hidden',
  indicatorsContainer: () => 'gap-x-0.5',
  clearIndicator: () =>
    'text-muted hover:text-danger hover:bg-danger/10 rounded-md transition-colors cursor-pointer p-1',
  dropdownIndicator: (state) =>
    `p-1 transition-colors ${state.isFocused ? 'text-primary' : 'text-muted'}`,
  menu: () =>
    `z-50 mt-2 rounded-xl border border-black/8 bg-surface/90 p-1 shadow-lg shadow-black/5
     backdrop-blur-xl backdrop-saturate-150
     dark:border-white/10 dark:bg-surface/80 dark:shadow-black/20`,

  // No z-index here: react-select writes the portal's `zIndex` inline, which
  // no class can beat. It is set through the `styles` prop instead — see the
  // note on it below.
  menuPortal: () => '',
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
  loadingIndicator: () => 'text-muted p-1',
  multiValue: () =>
    'flex items-center gap-x-1 rounded-md bg-primary/12 ps-2 pe-0.5 py-0.5',
  multiValueLabel: () => 'text-xs font-medium text-primary',
  multiValueRemove: () =>
    'text-primary/70 hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer rounded-sm p-0.5',
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
      {/* `children` is the formatOptionLabel output, so custom labels
          (avatars, status dots) show in the menu, not just the plain text */}
      <div className="flex w-full items-center justify-between gap-x-2">
        <span className="min-w-0 truncate text-sm">{props.children}</span>
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
  hint,
  id,
  components: customComponents,
  required = false,
  styles,
  ...props
}: SelectProps<Option, IsMulti>) {
  const { t } = useTranslation()
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`

  return (
    <div className="w-full">
      {label && (
        <FieldLabel htmlFor={inputId} required={required}>
          {label}
        </FieldLabel>
      )}

      <ReactSelect<Option, IsMulti, GroupBase<Option>>
        inputId={inputId}
        aria-invalid={!!error}
        aria-errormessage={error ? messageId : undefined}
        loadingMessage={() => t('Loading...')}
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
        /*
          The menu is portalled to `<body>`, so it has to out-stack whatever it
          is rendered over — a Headless UI dialog sits at `z-50`, and
          `menuPortalCSS` is the one style function react-select still runs
          under `unstyled`, writing `zIndex: 1` inline. A class cannot beat an
          inline style, so the override has to be inline too. A caller's own
          `styles` still win, key by key.
        */
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          ...styles,
        }}
        components={{
          DropdownIndicator: DropdownIndicator as any,
          ClearIndicator: ClearIndicator as any,
          Option: OptionWithCheck as any,
          NoOptionsMessage: (props: any) => NoOptionsFound(props, t) as any,
          ...customComponents,
        }}
        {...props}
      />

      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  )
}

export default InputSelect
