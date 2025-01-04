import React, { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface RequestNameEditProps {
  name: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export function RequestNameEdit({ name, onSave, onCancel }: RequestNameEditProps) {
  const [value, setValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSave(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
      />
      <button
        type="submit"
        className="p-1 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
      >
        <Check size={14} />
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="p-1 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
      >
        <X size={14} />
      </button>
    </form>
  );
}