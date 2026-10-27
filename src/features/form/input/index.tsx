import { useRef, useState } from 'react'
import {
  AtSign,
  Crosshair,
  Globe,
  Layers,
  Lock,
  Mail,
  Search,
  Sparkles,
  TextCursorInput,
  Type,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Input from '#/components/input'
import Textarea from '#/components/textarea'
import ShowcaseHeader from '#/features/components/shared/showcase-header'
import ShowcaseSection from '#/features/components/shared/showcase-section'
import DemoCard from '#/features/components/shared/demo-card'

function StatesSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Layers}
      title="States"
      description="Every field shares one label, hint and error layout"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <DemoCard title="Default" code="label + placeholder">
          <Input label={t('Full name')} placeholder="Hamed Fazeli" />
        </DemoCard>

        <DemoCard title="Required" code="required">
          <Input
            label={t('Email')}
            type="email"
            placeholder="you@example.com"
            required
          />
        </DemoCard>

        <DemoCard title="Hint" code="hint">
          <Input
            label={t('Display name')}
            placeholder="hamed.f"
            hint={t('Shown on your profile and in comments.')}
          />
        </DemoCard>

        <DemoCard title="Error" code="error">
          <Input
            label={t('Username')}
            defaultValue="ha"
            error={t('Username must be at least 3 characters')}
          />
        </DemoCard>

        <DemoCard title="Disabled" code="disabled">
          <Input
            label={t('Workspace ID')}
            defaultValue="wksp_8f2a1c"
            disabled
          />
        </DemoCard>

        <DemoCard title="Read-only" code="readOnly">
          <Input
            label={t('API key')}
            defaultValue="sk_live_51Hx…9fQ2"
            readOnly
            dir="ltr"
            className="font-mono"
          />
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function TypesSection() {
  const { t } = useTranslation()

  return (
    <ShowcaseSection
      icon={Type}
      title="Types & icons"
      description="Native input types, a leading icon and the password toggle"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        <DemoCard title="Leading icon" code="icon={Mail}">
          <div className="flex flex-col gap-y-4">
            <Input
              icon={Mail}
              label={t('Email')}
              type="email"
              placeholder="you@example.com"
            />
            <Input
              icon={Search}
              type="search"
              aria-label={t('Search')}
              placeholder={t('Search tasks...')}
            />
          </div>
        </DemoCard>

        <DemoCard
          title="Password"
          code='type="password"'
          description="The eye button reveals the value"
        >
          <div className="flex flex-col gap-y-4">
            <Input
              icon={Lock}
              label={t('Password')}
              type="password"
              defaultValue="correct-horse"
            />
            <Input
              label={t('Confirm password')}
              type="password"
              placeholder="••••••••"
            />
          </div>
        </DemoCard>

        <DemoCard
          title="Native types"
          code='type="number" | "tel" | "url"'
          className="md:col-span-2"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input label={t('Quantity')} type="number" placeholder="0" />
            <Input
              label={t('Phone')}
              type="tel"
              placeholder="+98 912 345 6789"
              dir="ltr"
            />
            <Input
              icon={Globe}
              label={t('Website')}
              type="url"
              placeholder="https://"
              dir="ltr"
            />
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function TextareaSection() {
  const { t } = useTranslation()
  const [bio, setBio] = useState(
    t('Frontend developer who enjoys building calm, fast dashboards.'),
  )

  return (
    <ShowcaseSection
      icon={TextCursorInput}
      title="Textarea"
      description="Multi-line text with the same states and an optional counter"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        <DemoCard
          title="Character counter"
          code="maxLength + showCount"
          description="The counter turns amber near the limit"
        >
          <Textarea
            label={t('Bio')}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={80}
            showCount
            hint={t('A sentence or two about you.')}
          />
        </DemoCard>

        <DemoCard title="Error" code="error">
          <Textarea
            label={t('Message')}
            placeholder={t('Describe the issue...')}
            required
            error={t('Please describe the issue')}
          />
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function InContextSection() {
  const { t } = useTranslation()
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ handle: false, email: false })
  const focusRef = useRef<HTMLInputElement>(null)

  const handleError =
    touched.handle && handle.length < 3
      ? t('Username must be at least 3 characters')
      : undefined
  const emailError =
    touched.email && !emailPattern.test(email)
      ? t('Enter a valid email address')
      : undefined

  return (
    <ShowcaseSection
      icon={Sparkles}
      title="In context"
      description="Validation on blur, and focus from code"
    >
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
        <DemoCard
          title="Live validation"
          description="Errors appear after you leave a field"
        >
          <form
            noValidate
            className="flex flex-col gap-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              setTouched({ handle: true, email: true })
            }}
          >
            <Input
              icon={AtSign}
              label={t('Username')}
              placeholder="hamed"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, handle: true }))}
              error={handleError}
              hint={t('At least 3 characters.')}
              required
              dir="ltr"
            />
            <Input
              icon={Mail}
              label={t('Email')}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, email: true }))}
              error={emailError}
              required
              dir="ltr"
            />
            <button type="submit" className="btn btn-primary self-start px-4">
              {t('Create account')}
            </button>
          </form>
        </DemoCard>

        <DemoCard
          title="Ref forwarding"
          code="ref"
          description="Focus or select the field from code"
        >
          <div className="flex flex-col gap-y-4">
            <Input
              ref={focusRef}
              label={t('Focus target')}
              defaultValue={t('Select me')}
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => focusRef.current?.focus()}
                className="btn btn-secondary px-3"
              >
                <Crosshair size={14} />
                {t('Focus')}
              </button>
              <button
                type="button"
                onClick={() => focusRef.current?.select()}
                className="btn btn-secondary px-3"
              >
                {t('Select text')}
              </button>
            </div>
          </div>
        </DemoCard>
      </div>
    </ShowcaseSection>
  )
}

function InputShowCase() {
  return (
    <div className="flex w-full flex-col gap-y-10">
      <ShowcaseHeader
        title="Inputs"
        description="Text fields with a label, hint, error and required marker — plus leading icons, a password toggle and a textarea with a counter."
        code='<Input label="Email" icon={Mail} hint="…" error="…" required />'
        stats={[
          { value: 6, label: 'States' },
          { value: 2, label: 'Fields' },
          { value: 'RTL', label: 'Ready' },
        ]}
      />
      <StatesSection />
      <TypesSection />
      <TextareaSection />
      <InContextSection />
    </div>
  )
}

export default InputShowCase
