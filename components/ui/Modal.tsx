"use client";

import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/70 z-40" onClick={onClose} />

      <div className="relative z-50 w-full max-w-2xl mx-4">
        <div className="bg-[rgba(15,15,20,1)] border border-[--border] rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-[--text-muted]">Close</button>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
