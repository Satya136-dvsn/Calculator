import React from 'react';

/**
 * React Error Boundary
 * Catches render errors and shows a friendly recovery UI instead of a blank screen.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log to console in development
        console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center p-4">
                    <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700/50 max-w-md text-center">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h2 className="text-white text-xl font-bold mb-2">Something went wrong</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            The calculator encountered an unexpected error. Click the button below to reset.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <pre className="bg-gray-900/60 rounded-xl p-3 mb-4 text-red-400 text-xs text-left overflow-auto max-h-32 border border-gray-700/50">
                                {this.state.error.toString()}
                            </pre>
                        )}
                        <button
                            onClick={this.handleReset}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/20"
                        >
                            Reset Calculator
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
