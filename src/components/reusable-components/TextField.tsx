type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  description,
}: TextFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-2"
      >
        {label}
      </label>

      <input
        id={id}
        className="
          w-full
          rounded-md
          border border-input
          bg-transparent
          px-3 py-2
          text-sm
          shadow-xs
          transition-[color,box-shadow]
          outline-none
          placeholder:text-muted-foreground
          focus-visible:border-ring
          focus-visible:ring-ring/50
          focus-visible:ring-[3px]
        "
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={description ? `${id}-description` : undefined}
      />

      {description && (
        <span id={`${id}-description`} className="sr-only">
          {description}
        </span>
      )}
    </div>
  );
}
