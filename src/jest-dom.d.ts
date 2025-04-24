/**
 * This file contains TypeScript type definitions for Jest DOM matchers
 * It adds TypeScript support for @testing-library/jest-dom matchers
 */

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(content: string | RegExp): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveValue(value: string | string[] | number): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeVisible(): R;
      toBeChecked(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveFocus(): R;
    }
  }
}

// This needs to be an actual module export
export {};