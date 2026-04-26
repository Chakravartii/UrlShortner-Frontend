import React from 'react'
import ShortenItem from './ShortenItem'

const ShortenUrlList = ({ data = [], refetch }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      {data.map((item) => (
        <ShortenItem key={item.id} {...item} refetch={refetch} />
      ))}
    </div>
  )
}

export default ShortenUrlList