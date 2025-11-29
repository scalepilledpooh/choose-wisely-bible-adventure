import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function ChoiceButton({ children, onClick, disabled }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl border border-slate-700/50 bg-slate-900/70 px-4 py-3 text-left text-base font-semibold transition hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-amber-200/10 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}
