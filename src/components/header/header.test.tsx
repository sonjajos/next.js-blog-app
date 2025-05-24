/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './';
import { useSession } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock @heroui/react components
jest.mock('@heroui/react', () => ({
  Navbar: ({ children }: any) => <nav>{children}</nav>,
  NavbarBrand: ({ children }: any) => <div>{children}</div>,
  NavbarContent: ({ children }: any) => <div>{children}</div>,
  NavbarItem: ({ children }: any) => <div>{children}</div>,
  NavbarMenu: ({ children }: any) => <div>{children}</div>,
  NavbarMenuItem: ({ children }: any) => <div>{children}</div>,
  NavbarMenuToggle: (props: any) => <button {...props} />,
}));

// Mock internal components
jest.mock('../auth-modal', () => () => <div data-testid="auth-modal" />);
jest.mock('../topic/topic-modal', () => () => <div data-testid="topic-modal" />);
jest.mock('../user-avatar', () => () => <div data-testid="user-avatar" />);
jest.mock('../search', () => () => <input data-testid="search-input" />);
jest.mock('../logo', () => () => <div data-testid="logo" />);


describe('Header component', () => {
  it('renders correctly for unauthenticated users', () => {
    // @ts-ignore
    useSession.mockReturnValue({ status: 'unauthenticated', data: null });

    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getAllByTestId('search-input').length).toBeGreaterThan(0);
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();

    // Since user is not authorised, topic-modal and user-avatar should NOT be rendered
    expect(screen.queryByTestId('topic-modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();
  });

  it('renders correctly for authenticated users', () => {
    // @ts-ignore
    useSession.mockReturnValue({
      status: 'authenticated',
      data: { user: { name: 'John' } },
    });

    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getAllByTestId('search-input').length).toBeGreaterThan(0);

    expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();

    expect(screen.getByTestId('topic-modal')).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
  });
});
