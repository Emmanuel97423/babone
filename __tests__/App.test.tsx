import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../src/App';
import { mockWindows, mockIPC } from '@tauri-apps/api/mocks';
import { invoke } from '@tauri-apps/api/tauri';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const headline = screen.getByText('Welcome to Tauri!');
    expect(headline).toBeTruthy();
  });
  it('Enter input and click button', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter a name...');
    const button = screen.getByText('Greet');

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();

    fireEvent.change(input, { target: { value: 'Manu' } });
    fireEvent.click(button);

    const greetMsg = screen.getByText("You've been greeted from Tauri Manu");

    expect(greetMsg).toBeTruthy();
  });

  describe('invokes tauri command', () => {
    it('mocked windows', () => {
      mockWindows('main', 'second', 'third');

      expect(window).toHaveProperty('__TAURI_METADATA__');
    });

    it('Greet invoke tauri command', () => {
      mockIPC((cmd: string, args: Record<string, unknown>) => {
        if (cmd === 'greet') {
          return `Hello, ${args['name']}! You've been greeted from Rust!`;
        }
      });
      expect(invoke('greet', { name: 'Manu' })).resolves.toBe(
        "Hello, Manu! You've been greeted from Rust!"
      );
    });
  });
});
