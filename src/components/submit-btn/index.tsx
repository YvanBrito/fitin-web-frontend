import { useFormStatus } from 'react-dom'
import { LoadingButton } from '@mui/lab'

interface SubmitBtnProps {
  label: string
}

export function SubmitBtn({ label }: SubmitBtnProps) {
  const { pending } = useFormStatus()

  return (
    <LoadingButton
      variant="contained"
      sx={{ mt: 3, mb: 2, width: '100%' }}
      type="submit"
      loading={pending}
    >
      {label}
    </LoadingButton>
  )
}
