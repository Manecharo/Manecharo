"use client";

import { Component, ReactNode } from "react";

export function webglAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface GuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/** Error boundary so a WebGL failure can never take a page down. */
export class CanvasGuard extends Component<GuardProps, { failed: boolean }> {
  constructor(props: GuardProps) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("WebGL scene failed, falling back to static layout:", error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
