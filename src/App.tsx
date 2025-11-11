import './App.css'
import SummaryCard from './components/SummaryCard';
import StatementTable from './components/StatementTable';
import FileUploader from './components/UploadFile';
import { getBalanceAPI, getIssuesAPI, uploadStatementAPI } from './services/api';
import { useEffect, useState } from 'react';
import type { StatementsResponse, SummaryResponse } from './entity/response';

function App() {
  // get balance
  const [balance, setBalance] = useState<SummaryResponse>({ totalCredit: 0, totalDebit: 0, totalBalance: 0 });
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [errorBalance, setErrorBalance] = useState<string>("");

  const getBalance = async() => {
    try {
      setLoadingBalance(true);
      const data = await getBalanceAPI();
      setBalance(data);
    } catch (error:any) {
      setErrorBalance(error.message || "Failed to fetch balance");
    } finally {
      setLoadingBalance(false);
    }
  }

  // get issued statements
  const [statements, setStatements] = useState<StatementsResponse[]>([]);
  const [loadingStatements, setLoadingStatements] = useState(true);
  const [errorStatements, setErrorStatements] = useState<string>("");

  const getIssuedStatements = async () => {
    try {
      setLoadingStatements(true);
      const data = await getIssuesAPI();
      setStatements(data);
    } catch (error:any) {
      setErrorStatements(error.message || "Failed to fetch statements");
    } finally {
      setLoadingStatements(false);
    }
  }

  const onSubmitFile = async (file: File) => {
    // After file is uploaded, refresh balance and statements
    try {
      await uploadStatementAPI(file);
      getBalance();
      getIssuedStatements();
      alert("File processed successfully.");
    } catch (error) {
      alert("Error processing file.");
    }
  }

  useEffect(() => {
    getBalance();
    getIssuedStatements();
  }, []);

  return (
    <div className="app">
      <h1>Bank Statement</h1>
      <FileUploader onSubmit={onSubmitFile} />


      <h1>Transaction Summary</h1>
      <SummaryCard data={[
        { title: 'Total Credit', value: balance.totalCredit, className: 'credit' },
        { title: 'Total Debit', value: balance.totalDebit, className: 'debit' },
        { title: 'End Balance', value: balance.totalBalance },
      ]} loading={loadingBalance} error={errorBalance} />


      <h2>Non-successful Transactions</h2>
      <StatementTable data={statements} loading={loadingStatements} error={errorStatements} />
    </div>
  )
}

export default App
