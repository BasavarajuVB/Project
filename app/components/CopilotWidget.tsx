'use client';

import React, { useState, useEffect } from 'react';
import { Button, Spin, Input } from 'antd';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface CopilotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const CopilotWidget: React.FC<CopilotWidgetProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{id: string, type: 'user' | 'assistant', content: string, timestamp: Date}>>([]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setShowFallback(false);
      
      // Show the interface after a brief loading period
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowFallback(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOpenCopilotWeb = () => {
    window.open('https://example.com/', '_blank', 'noopener,noreferrer');
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        type: 'user' as const,
        content: inputValue,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // Simulate AI response
      setTimeout(() => {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant' as const,
          content: `I understand you're asking: "${inputValue}". For detailed analysis and comprehensive responses, I recommend using the full Microsoft Copilot experience. Click "Open in new tab" below for the complete AI assistant capabilities.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`copilot-widget microsoft-copilot ${isOpen ? 'open' : ''}`}>
      <div className="copilot-header microsoft-header">
        <div className="copilot-header-left">
          <div>
            <h3>AI Assistant</h3>
            <span className="copilot-status">AI-powered assistant</span>
          </div>
        </div>
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose}
          className="copilot-close-btn"
        />
      </div>

      <div className="copilot-content microsoft-content">
        {isLoading ? (
          <div className="loading-container">
            <Spin size="large" />
            <p>Connecting to AI Assistant...</p>
          </div>
        ) : (
          <div className="copilot-main-content">
            {messages.length === 0 ? (
              <>
                <div className="copilot-welcome">
                  <div className="copilot-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="20" fill="#0078d4"/>
                      <path d="M16 20h16v8H16z" fill="white"/>
                      <circle cx="20" cy="24" r="2" fill="#0078d4"/>
                      <circle cx="28" cy="24" r="2" fill="#0078d4"/>
                    </svg>
                  </div>
                  <h3>AI Assistant</h3>
                  <p>Ask me anything about your dashboard or data</p>
                </div>
                
                <div className="copilot-suggestions">
                  <h4>Try asking:</h4>
                  <div className="suggestion-prompts">
                    <div className="prompt-card" onClick={() => setInputValue("Analyze the SLA performance metrics")}>
                      <span>📊 Analyze the SLA performance metrics</span>
                    </div>
                    <div className="prompt-card" onClick={() => setInputValue("What insights can you provide from this dashboard?")}>
                      <span>💡 What insights can you provide from this dashboard?</span>
                    </div>
                    <div className="prompt-card" onClick={() => setInputValue("Generate a performance summary report")}>
                      <span>📈 Generate a performance summary report</span>
                    </div>
                    <div className="prompt-card" onClick={() => setInputValue("Help me understand the failed captures data")}>
                      <span>🔍 Help me understand the failed captures data</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="chat-messages">
                {messages.map((message) => (
                  <div key={message.id} className={`chat-message ${message.type}`}>
                    <div className="message-content">
                      <p>{message.content}</p>
                      <span className="message-time">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="copilot-input-section">
        <div className="input-container">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask AI Assistant anything about your dashboard..."
            autoSize={{ minRows: 1, maxRows: 3 }}
            className="copilot-input"
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="send-button"
          />
        </div>
      </div>

      <div className="copilot-footer microsoft-footer">
        <div className="footer-links">
          <button onClick={handleOpenCopilotWeb} className="footer-link">Open in new tab</button>
        </div>
      </div>
    </div>
  );
};

export default CopilotWidget;