import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { CompanyKeyMetrics } from '../../company'
import { testIncomeStatementData } from '../../Components/Table/testData'

type Props = {}

const tableConfig = [
  {
    label: 'Market Cap',
    render: (company: CompanyKeyMetrics) => company.marketCapTTM,
    subTitle: 'Total value of all time that have been in stock',
  },
]
const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Desing Page</h1>
      <h2>
        This is FinShark's design page.This is where we well house various
        design aspects off the app
      </h2>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <Table data={testIncomeStatementData} config={tableConfig} />
    </>
  )
}

export default DesignPage
