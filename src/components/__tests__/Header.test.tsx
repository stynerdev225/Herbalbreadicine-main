import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

describe('Header Component', () => {
    test('renders search input', () => {
        render(<Header />);

        // Check if search input exists
        const searchInput = screen.getByPlaceholderText('Search for songs, artists...');
        expect(searchInput).toBeInTheDocument();
    });

    test('search input is functional', async () => {
        render(<Header />);

        // Get the search input
        const searchInput = screen.getByPlaceholderText('Search for songs, artists...');

        // Type in the search input
        await userEvent.type(searchInput, 'test search');

        // Check if the value was updated
        expect(searchInput).toHaveValue('test search');
    });

    test('renders navigation button', () => {
        render(<Header />);

        // Check if the button with back arrow exists
        const navButton = screen.getByRole('button');
        expect(navButton).toBeInTheDocument();

        // Check if it contains the SVG
        const svg = navButton.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    test('has proper accessibility attributes', () => {
        render(<Header />);

        // Header should be a semantic element
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();

        // Search input should have accessible name
        const searchInput = screen.getByPlaceholderText('Search for songs, artists...');
        expect(searchInput).toHaveAttribute('type', 'search');
    });
});