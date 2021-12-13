import React, { useState, useEffect } from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { get } from 'axios';

import { useFetch } from '../../hooks/useFetch';

const BasicStockInfo = ({ symbol }) => {
  const url = `http://localhost:5000/stock/details/${symbol}`;
  const { recdata, isLoading } = useFetch(url);
  const { data } = recdata;

  const [rating, setRating] = useState({});
  useEffect(() => {
    const url1 = `http://localhost:5000/stock/rating/${symbol}`;
    fetcherConditional(url1);
  }, [recdata, symbol]);
  const fetcherConditional = async (url1) => {
    try {
      const { data } = await get(url1, { crossdomain: true });
      setRating(data);
      console.log(rating);
    } catch (error) {
      throw new Error(error);
    }
  };

  if (!isLoading) {
    return (
      <div className="mt-4">
        <Card className="mb-8 shadow-md pl-4">
          <CardBody>
            <h1 className="mb-1 font-semibold font-mono text-2xl dark:text-gray-200 w-full text-center">
              {data.companyName} (
              <a
                href={data.website}
                className="dark:text-red-400 text-red-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.symbol}
              </a>
              )
            </h1>
            <p
              className="text-sm text-gray-700 dark:text-gray-300 mt-0"
              style={{
                fontFamily: 'Comfortaa',
                columnWidth: '400px',
                columnRule: '2px solid red',
                columnGap: '7em',
              }}
            >
              <p className="text-left mb-1">
                💰 <span className="font-semibold"> Exchange: </span>
                <span>
                  {data.exchange} ({data.exchangeShortName})
                </span>
              </p>
              <p className="text-left my-1">
                💵 <span className="font-semibold"> Currency: </span>
                <span>{data.currency}</span>
              </p>
              <p className="text-left my-1">
                🔧 <span className="font-semibold"> Industry: </span>
                <span>
                  {data.industry}, {data.sector}
                </span>
              </p>
              <p className="text-left my-1">
                🗺 <span className="font-semibold"> Address: </span>
                <span>
                  {data.address}, {data.city}, {data.state}, {data.zip}
                </span>
              </p>
              <p className="text-left my-1">
                📅 <span className="font-semibold"> IPO Date: </span>
                <span>{data.ipoDate}</span>
              </p>
              <p className="text-left my-1">
                📈 <span className="font-semibold"> Range: </span>
                <span>{data.range}</span>
              </p>
              <p className="text-left my-1">
                📑 <span className="font-semibold"> Volume Average: </span>
                <span>{data.volAvg}</span>
              </p>
              <p className="text-left my-1">
                💹 <span className="font-semibold"> Market Cap: </span>
                <span>{data.mktCap}</span>
              </p>
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <h1 className="my-2 font-semibold font-mono text-lg dark:text-gray-200 ml-4">
              Ratings (Based on DCF, ROA, DES, PB scores)
            </h1>
            <div
              className="text-sm text-gray-700 dark:text-gray-300 mt-0 pl-4"
              style={{
                fontFamily: 'Comfortaa',
              }}
            >
              <p>
                📅 <span className="font-semibold">Date:</span>{' '}
                <span>{rating.data.date}</span>
              </p>
              <p>
                ⭐ <span className="font-semibold">Rating:</span>{' '}
                <span>{rating.data.rating}</span>
              </p>
              <p>
                💯 <span className="font-semibold">Score:</span>{' '}
                <span>{rating.data.ratingScore}</span>
              </p>
              <p>
                💹 <span className="font-semibold">Recommendation:</span>{' '}
                <span>{rating.data.ratingRecommendation}</span>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  return (
    <p className="dark:text-white text-center animate__animated animate__flash animate__infinite">
      Loading...
    </p>
  );
};

export default BasicStockInfo;
