'use client'
import { Component, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="mt-10 p-10 border-4 border-dashed border-red-600 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="mb-4">An unexpected error occurred. Please try again.</p>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details className="mb-4">
                            <summary className="cursor-pointer text-sm text-gray-600">Error details</summary>
                            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                                {this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                    <Link 
                        href="/" 
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Return to home
                    </Link>
                </div>
            );
        }

        return this.props.children;
    }
}
