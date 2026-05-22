"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
  required?: boolean;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type SelectProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: "select";
    options: { value: string; label: string }[];
  };

export function CharroField(props: InputProps | SelectProps) {
  const { label, error, required, id, className = "" } = props;
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="charro-auth__label">
        {label}
        {required && <span className="text-charro-gold"> *</span>}
      </label>

      {props.as === "select" ? (
        (() => {
          const { options, as: _as, label: _l, error: _e, ...selectRest } =
            props;
          return (
            <select
              id={fieldId}
              required={required}
              className={`charro-auth__input ${className}`}
              {...selectRest}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );
        })()
      ) : (
        (() => {
          const { as: _as, label: _l, error: _e, ...inputRest } = props;
          return (
            <input
              id={fieldId}
              required={required}
              className={`charro-auth__input ${className}`}
              {...inputRest}
            />
          );
        })()
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
