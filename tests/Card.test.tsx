import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../src/components/Footer';

describe('Footer component', () => {
  it('renders the copyright text with the current year', () => {
    // here we simulate virtual dom in test environement, then we can use "expect"
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    // Check if footer have the goog text with current year
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(
      `Copyright © ${currentYear} - CityZen - Tous droits réservés`
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it('renders the legal notices link with the correct href', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    // Check if link send to the right page
    const legalNoticesLink = screen.getByRole('link', {
      name: /Mentions légales/,
    });
    expect(legalNoticesLink).toHaveAttribute('href', '/legal-notices');
  });
});
