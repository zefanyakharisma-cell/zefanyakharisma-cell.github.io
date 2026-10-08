import { Loader } from '@/components/pcu/Loader'

export default function Loading() {
  return (
    <div className="pcu-surface-brand relative overflow-hidden grid place-items-center min-h-[70vh]">
      <span aria-hidden className="pcu-shape pcu-shape--ring-u pointer-events-none absolute right-[6%] top-0 w-[280px] text-amber" />
      <span aria-hidden className="pcu-shape pcu-shape--ring-n-line pointer-events-none absolute left-[4%] bottom-0 w-[320px] text-teal" />
      <Loader compact label="Loading page" />
    </div>
  )
}
