
type BusinessCardProps = {
  name: string
  description: string
  onClick?: () => void
  isSelected?: boolean
}

function BusinessCard({
  name,
  description,
  onClick,
  isSelected = false,
}: BusinessCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full cursor-pointer rounded-2xl border p-6 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 shadow-md'
          : 'border-gray-200 bg-white shadow-sm hover:border-indigo-200'
      }`}
    >
      <h3 className="mb-2 text-lg font-bold text-indigo-900">
        {name}
      </h3>

      <p className="text-sm leading-6 text-slate-500">
        {description}
      </p>
    </button>
  )
}

export default BusinessCard
