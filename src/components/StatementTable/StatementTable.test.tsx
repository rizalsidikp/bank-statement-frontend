import { render, screen } from '@testing-library/react';
import StatementTable from '.';
import type { StatementsResponse } from '../../entity/response';

describe('StatementTable', () => {
    it('renders table rows based on data', async () => {
        const mockData: Array<StatementsResponse> = [
            { id: "1", timestamp: 1627935600, name: 'Deposit', type: 'CREDIT', amount: 100, status: 'PENDING', description: 'Salary' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal', type: 'DEBIT', amount: -50, status: 'FAILED', description: 'Groceries' },
            { id: "2", timestamp: 1627935200, name: 'Withdrawal B', type: 'DEBIT', amount: -50, status: 'PENDING', description: 'Groceries' },
            { id: "2", timestamp: 1627935200, name: 'Withdrawal C', type: 'DEBIT', amount: -50, status: 'FAILED', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal D', type: 'DEBIT', amount: -50, status: 'PENDING', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal E', type: 'DEBIT', amount: -50, status: 'FAILED', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal F', type: 'DEBIT', amount: -50, status: 'PENDING', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal G', type: 'DEBIT', amount: -50, status: 'FAILED', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal H', type: 'DEBIT', amount: -50, status: 'PENDING', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal I', type: 'DEBIT', amount: -50, status: 'FAILED', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal J', type: 'DEBIT', amount: -50, status: 'PENDING', description: 'Groceries' },
            { id: "2", timestamp: 1627935600, name: 'Withdrawal K', type: 'DEBIT', amount: -50, status: 'FAILED', description: 'Groceries' },
        ];
        render(<StatementTable data={mockData} />);

        expect(screen.getByText('Deposit')).toBeInTheDocument();
        expect(screen.getByText('Withdrawal')).toBeInTheDocument();

        let sortButton = screen.getByRole('button', { name: /Sort by statement date/i });
        await sortButton.click();
        await sortButton.click();

        sortButton = screen.getByRole('button', { name: /Sort by type/i });
        await sortButton.click();
        await sortButton.click();

        sortButton = screen.getByRole('button', { name: /Sort by amount/i });
        await sortButton.click();
        await sortButton.click();

        sortButton = screen.getByRole('button', { name: /Sort by status/i });
        await sortButton.click();
        await sortButton.click();

        sortButton = screen.getByRole('button', { name: /Sort by name/i });
        await sortButton.click();
        await sortButton.click();

        // click button next page
        const nextPageButton = screen.getByRole('button', { name: /Next/i });
        await nextPageButton.click();

        const prevPageButton = screen.getByRole('button', { name: /Prev/i });
        await prevPageButton.click();

    });

    it('shows empty state when no data', () => {
        render(<StatementTable data={[]} />);
        expect(screen.getByText("No statements found")).toBeInTheDocument();
    });

    it('displays loading state', () => {
        render(<StatementTable data={[]} loading={true} />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('displays error message', () => {
        const errorMessage = 'Failed to load statements';
        render(<StatementTable data={[]} error={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
});