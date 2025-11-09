import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ConversationDisplay,
  Message,
} from '../../src/components/ConversationDisplay';
import { CDSHookCard } from '../../src/models/card';

describe('ConversationDisplay', () => {
  it('should render empty state when no messages', () => {
    render(<ConversationDisplay messages={[]} />);
    expect(screen.getByText(/No messages yet/i)).toBeInTheDocument();
  });

  it('should render user messages', () => {
    const messages: Message[] = [
      {
        type: 'user',
        content: 'Hello, world!',
        timestamp: new Date('2024-01-01T12:00:00'),
      },
    ];

    render(<ConversationDisplay messages={messages} />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
  });

  it('should render system messages', () => {
    const messages: Message[] = [
      {
        type: 'system',
        content: 'System response',
        timestamp: new Date('2024-01-01T12:00:00'),
      },
    ];

    render(<ConversationDisplay messages={messages} />);
    expect(screen.getByText('System response')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
  });

  it('should render messages with cards', () => {
    const card = new CDSHookCard({
      summary: 'Card Summary',
      detail: 'Card Detail',
      indicator: 'info',
    });

    const messages: Message[] = [
      {
        type: 'system',
        content: 'Response with card',
        card,
        timestamp: new Date('2024-01-01T12:00:00'),
      },
    ];

    render(<ConversationDisplay messages={messages} />);
    expect(screen.getByText('Response with card')).toBeInTheDocument();
    expect(screen.getByText('Card Summary')).toBeInTheDocument();
    expect(screen.getByText('Card Detail')).toBeInTheDocument();
  });

  it('should render card with source information', () => {
    const card = new CDSHookCard({
      summary: 'Card with Source',
      source: {
        label: 'Test Source',
        url: 'https://example.com',
      },
    });

    const messages: Message[] = [
      {
        type: 'system',
        content: 'Message',
        card,
        timestamp: new Date('2024-01-01T12:00:00'),
      },
    ];

    render(<ConversationDisplay messages={messages} />);
    expect(screen.getByText(/Source: Test Source/i)).toBeInTheDocument();
    expect(screen.getByText('(link)')).toBeInTheDocument();
  });

  it('should render card with links', () => {
    const card = new CDSHookCard({
      summary: 'Card with Links',
      links: [
        { label: 'Link 1', url: 'https://example.com/1' },
        { label: 'Link 2', url: 'https://example.com/2' },
      ],
    });

    const messages: Message[] = [
      {
        type: 'system',
        content: 'Message',
        card,
        timestamp: new Date('2024-01-01T12:00:00'),
      },
    ];

    render(<ConversationDisplay messages={messages} />);
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('should render multiple messages in order', () => {
    const messages: Message[] = [
      {
        type: 'user',
        content: 'First message',
        timestamp: new Date('2024-01-01T12:00:00'),
      },
      {
        type: 'system',
        content: 'Second message',
        timestamp: new Date('2024-01-01T12:01:00'),
      },
      {
        type: 'user',
        content: 'Third message',
        timestamp: new Date('2024-01-01T12:02:00'),
      },
    ];

    render(<ConversationDisplay messages={messages} />);
    expect(screen.getByText('First message')).toBeInTheDocument();
    expect(screen.getByText('Second message')).toBeInTheDocument();
    expect(screen.getByText('Third message')).toBeInTheDocument();
  });

  it('should render card indicators with correct styling', () => {
    const infoCard = new CDSHookCard({
      summary: 'Info Card',
      indicator: 'info',
    });

    const warningCard = new CDSHookCard({
      summary: 'Warning Card',
      indicator: 'warning',
    });

    const hardStopCard = new CDSHookCard({
      summary: 'Hard Stop Card',
      indicator: 'hard-stop',
    });

    const messages: Message[] = [
      {
        type: 'system',
        content: 'Message 1',
        card: infoCard,
        timestamp: new Date('2024-01-01T12:00:00'),
      },
      {
        type: 'system',
        content: 'Message 2',
        card: warningCard,
        timestamp: new Date('2024-01-01T12:01:00'),
      },
      {
        type: 'system',
        content: 'Message 3',
        card: hardStopCard,
        timestamp: new Date('2024-01-01T12:02:00'),
      },
    ];

    render(<ConversationDisplay messages={messages} />);
    expect(screen.getByText('INFO')).toBeInTheDocument();
    expect(screen.getByText('WARNING')).toBeInTheDocument();
    expect(screen.getByText('HARD-STOP')).toBeInTheDocument();
  });
});
