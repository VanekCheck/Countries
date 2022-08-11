import './country-card.styles.scss'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { BorderCountry, CountryInfo, Loading } from '../'
import { useEffect } from 'react'

// actions
import {getCountry } from '../../features/countrySlice'

const CountryCard = () => {
  const dispatch = useDispatch()

  const { isLoading, currentCountry } = useSelector(
    (store) => store.country
  )

  const {
    name,
    officialName,
    capital,
    population,
    region,
    subregion,
    flag,
    languages,
    domain,
    currencies,
    borders,
  } = currentCountry

  useEffect(() => {
    dispatch(getCountry())
  }, [])

  if (isLoading) {
    return (
      <div className="loading__container">
        <Loading />
      </div>
    )
  }
  return (
    <div className="country-card">
      <div className="country-card__flag">
        <img src={flag} alt={`flag of ${name}`}></img>
      </div>
      <div className="country-card__content">
        <header>
          <h2>{name}</h2>
        </header>
        <div className="country-card__main-info">
          <div>
            <CountryInfo title="Official Name" text={officialName} />
            <CountryInfo title="Population" text={population} />
            <CountryInfo title="Region" text={region} />
            <CountryInfo title="Sub Region" text={subregion} />
            <CountryInfo title="Capital" text={capital?.join(', ')} />
          </div>
          <div>
            <CountryInfo title="Top Level Domain" text={domain?.join(', ')} />
            <CountryInfo title="Currencies" text={currencies?.join(', ')} />
            <CountryInfo title="Languages" text={languages?.join(', ')} />
          </div>
        </div>
        <footer>
          <p>
            <b>Border Countries:</b>
          </p>
          <div className="country-card__borders">
            {borders &&
              borders.map((item, index) => {
                return <BorderCountry key={index} name={item} />
              })}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default CountryCard
