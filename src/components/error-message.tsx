interface ErrorMessageProps {
  message?: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className="mt-1 text-xs text-red-500">{message}</span>
}
