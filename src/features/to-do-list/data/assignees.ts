// Every avatar in src/assets/avatar, resolved by Vite to its real URL — the
// same URLs the imported Avatar1…Avatar30 in todos.ts resolve to, so existing
// tasks match an option when edited.
const avatarModules = import.meta.glob<string>('../../../assets/avatar/*.png', {
  eager: true,
  import: 'default',
})

export interface AssigneeOption {
  value: string
  label: string
  avatarUrl: string
}

export const assigneeOptions: AssigneeOption[] = Object.entries(avatarModules)
  .map(([path, url]) => ({
    number: Number(path.match(/memo_(\d+)\.png$/)?.[1] ?? 0),
    url,
  }))
  .sort((a, b) => a.number - b.number)
  .map(({ number, url }) => ({
    value: url,
    label: `User ${number}`,
    avatarUrl: url,
  }))

export function getAssigneeName(url: string | undefined) {
  return assigneeOptions.find((option) => option.value === url)?.label
}
