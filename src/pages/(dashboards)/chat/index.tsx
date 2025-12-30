import { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

interface Message {
  id: number
  user: string
  message: string
  timestamp: string
  avatar: string
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: 'John Doe',
      message: 'Hello team! How is the project going?',
      timestamp: '10:30 AM',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
    },
    {
      id: 2,
      user: 'Sarah Smith',
      message: 'Going well! Almost completed the first phase.',
      timestamp: '10:35 AM',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=random'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      message: 'Great! Let me know when you need review.',
      timestamp: '10:40 AM',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random'
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'https://ui-avatars.com/api/?name=You&background=0d47a1'
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center gap-2 mb-3">
            <IconifyIcon icon="lucide:message-circle" width={28} height={28} className="text-primary" />
            <h2 className="mb-0">Chat with Others</h2>
          </div>
          <p className="text-muted mb-0">Connect and communicate with your team members</p>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            {/* Chat Messages */}
            <Card.Body style={{ height: '500px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
              <div className="d-flex flex-column gap-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="d-flex gap-3">
                    <img
                      src={msg.avatar}
                      alt={msg.user}
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <div className="bg-white p-3 rounded-2 shadow-sm">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <strong className="text-dark">{msg.user}</strong>
                          <small className="text-muted">{msg.timestamp}</small>
                        </div>
                        <p className="mb-0 text-dark">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>

            {/* Message Input */}
            <Card.Footer className="bg-white border-top">
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="d-flex gap-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="rounded-pill"
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="rounded-pill px-4"
                  disabled={!newMessage.trim()}
                >
                  <IconifyIcon icon="lucide:send" width={18} height={18} />
                </Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Chat
