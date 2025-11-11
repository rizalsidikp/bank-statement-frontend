import { render, screen } from '@testing-library/react'
import SummaryCard from '.'

describe('Summary component', () => {
    it('renders total credit, debit, and balance correctly', () => {
        render(
            <SummaryCard
                data={[
                    { title: 'Total Credit', value: 12000000, className: 'credit' },
                    { title: 'Total Debit', value: 250000, className: 'debit' },
                    { title: 'End Balance', value: "11750000" },
                ]}
            />
        )

        expect(screen.getByText(/Total Credit/i)).toBeInTheDocument()
        expect(screen.getByText('Rp 12.000.000,00')).toBeInTheDocument()

        expect(screen.getByText(/Total Debit/i)).toBeInTheDocument()
        expect(screen.getByText('Rp 250.000,00')).toBeInTheDocument()

        expect(screen.getByText(/End Balance/i)).toBeInTheDocument()
        expect(screen.getByText('Rp 11.750.000,00')).toBeInTheDocument()
    })

    it('displays loading state', () => {
        render(<SummaryCard data={[]} loading={true} />)
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    })

    it('displays error message', () => {
        const errorMessage = 'Failed to load data'
        render(<SummaryCard data={[]} error={errorMessage} />)
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
})