import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { CompanySearch } from '../../company'
import { searchCompanies } from '../../api'
import Search from '../../Components/Search/Search'
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio'
import CardList from '../../Components/CardList/CardList'
import { PortfolioGet } from '../../Models/Portfolio'
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from '../../Serivces/PortfolioService'
import { toast } from 'react-toastify'

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>('')
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>(
    []
  )
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([])
  const [serverError, setServerError] = useState<string | null>(null)

  useEffect(() => {
    getPortfolio()
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res?.data)
        }
        console.log(res)
      })
      .catch((e) => {
        setPortfolioValues(null)
      })
  }

  // const onPortfolioCreate = (e: any) => {
  //   e.preventDefault()
  //   portfolioAddAPI(e.target[0].value)
  //     .then((res) => {
  //       if (res?.status === 204) {
  //         toast.success('Stock added to portfolio!')
  //         getPortfolio()
  //       }
  //       console.log(res)
  //     })
  //     .catch((e) => {
  //       toast.warning('Could not add stock to portfolio!')
  //     })
  // }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault()

    const stockValue = e.target[0]?.value

    // Check if the stock value is correctly retrieved
    if (!stockValue) {
      toast.warning('Please enter a valid stock value!')
      return
    }

    portfolioAddAPI(stockValue)
      .then((res) => {
        if (res?.status === 201) {
          toast.success('Stock added to portfolio!')
          getPortfolio()
        } else {
          toast.warning('Unexpected response from server!')
          console.log('Unexpected response:', res)
        }
      })
      .catch((error) => {
        toast.warning('Could not add stock to portfolio!')
        console.error('API Error:', error)
      })
  }

  const onPortfolioDelete = (e: any) => {
    e.preventDefault()
    portfolioDeleteAPI(e.target[0].value).then((res) => {
      if (res?.status == 200) {
        toast.success('Stock deleted from portfolio!')
        getPortfolio()
      }
    })
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const result = await searchCompanies(search)
    //setServerError(result.data);
    if (typeof result === 'string') {
      setServerError(result)
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data)
    }
  }
  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <div>Unable to connect to API</div>}
    </>
  )
}

export default SearchPage
