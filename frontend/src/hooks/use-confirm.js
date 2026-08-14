"use client";

export function useConfirm() {
  return async (message) => {
    return window.confirm(message);
  };
}