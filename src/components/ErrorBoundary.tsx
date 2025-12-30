import { Component, type ReactNode } from 'react'
import { Container, Alert, Button } from 'react-bootstrap'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error('Error boundary caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container fluid className="py-5">
          <Alert variant="danger">
            <h4>Oops! Something went wrong</h4>
            <p>{this.state.error?.message}</p>
            <hr />
            <details className="text-start" style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
              <summary>Stack Trace</summary>
              {this.state.error?.stack}
            </details>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Alert>
        </Container>
      )
    }

    return this.props.children
  }
}
