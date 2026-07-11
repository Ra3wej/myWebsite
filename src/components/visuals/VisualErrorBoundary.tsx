import { Component, type ReactNode } from 'react';

interface VisualErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback: ReactNode;
}

interface VisualErrorBoundaryState {
  readonly hasError: boolean;
}

export class VisualErrorBoundary extends Component<
  VisualErrorBoundaryProps,
  VisualErrorBoundaryState
> {
  public state: VisualErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): VisualErrorBoundaryState {
    return { hasError: true };
  }

  public render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
