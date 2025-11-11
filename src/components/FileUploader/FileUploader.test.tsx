import { render, fireEvent, screen } from '@testing-library/react';
import FileUploader from '.';

describe('FileUploader', () => {
    it('renders the file input', () => {
        render(<FileUploader />);
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    it('calls onChange when a file is selected', async () => {
        const mockSubmit = vi.fn();
        globalThis.alert = vi.fn();
        globalThis.confirm = vi.fn(() => true);

        render(<FileUploader onSubmit={mockSubmit} />);

        const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        expect(globalThis.alert).not.toHaveBeenCalled();
        expect(globalThis.confirm).toHaveBeenCalledWith('Process this file?');
        expect(mockSubmit).toHaveBeenCalled();
    });

    it('shows alert for non-csv files', () => {
        globalThis.alert = vi.fn();

        render(<FileUploader />);

        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
        fireEvent.change(screen.getByTestId('file-input'), { target: { files: [file] } });
        expect(globalThis.alert).toHaveBeenCalledWith('File must be in .csv format');
    });

    it('does nothing if no file is selected', () => {
        const mockSubmit = vi.fn();
        globalThis.alert = vi.fn();
        globalThis.confirm = vi.fn();

        render(<FileUploader onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [] },
        });

        expect(globalThis.alert).not.toHaveBeenCalled();
        expect(globalThis.confirm).not.toHaveBeenCalled();
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('does not call onSubmit if user cancels confirmation', () => {
        const mockSubmit = vi.fn();
        globalThis.alert = vi.fn();
        globalThis.confirm = vi.fn(() => false);

        render(<FileUploader onSubmit={mockSubmit} />);

        const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        expect(globalThis.alert).not.toHaveBeenCalled();
        expect(globalThis.confirm).toHaveBeenCalledWith('Process this file?');
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('does not call onSubmit because null', () => {
        const mockSubmit = vi.fn();
        globalThis.alert = vi.fn();
        globalThis.confirm = vi.fn(() => true);

        render(<FileUploader />);

        const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' });
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        expect(globalThis.alert).not.toHaveBeenCalled();
        expect(globalThis.confirm).toHaveBeenCalledWith('Process this file?');
        expect(mockSubmit).not.toHaveBeenCalled();
    });
});