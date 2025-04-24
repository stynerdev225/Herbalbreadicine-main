import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../Navigation';

// Mock component wrapper with Router
const renderWithRouter = (ui: React.ReactNode) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navigation Component', () => {
    test('renders navigation links', () => {
        renderWithRouter(<Navigation />);

        // Check if navigation links exist
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.getByText(/about/i)).toBeInTheDocument();
        expect(screen.getByText(/menu/i)).toBeInTheDocument();
        expect(screen.getByText(/contact/i)).toBeInTheDocument();
    });

    test('navigation links have correct hrefs', () => {
        renderWithRouter(<Navigation />);

        // Check if links have correct hrefs
        const homeLink = screen.getByText(/home/i).closest('a');
        const aboutLink = screen.getByText(/about/i).closest('a');
        const menuLink = screen.getByText(/menu/i).closest('a');
        const contactLink = screen.getByText(/contact/i).closest('a');

        expect(homeLink).toHaveAttribute('href', '/');
        expect(aboutLink).toHaveAttribute('href', '/about');
        expect(menuLink).toHaveAttribute('href', '/menu');
        expect(contactLink).toHaveAttribute('href', '/contact');
    });

    test('has proper accessibility attributes', () => {
        renderWithRouter(<Navigation />);

        // Navigation should be a semantic element
        const navElement = screen.getByRole('navigation');
        expect(navElement).toBeInTheDocument();

        // Links should have accessible names
        const links = screen.getAllByRole('link');
        links.forEach(link => {
            expect(link).toHaveAccessibleName();
        });
    });
});