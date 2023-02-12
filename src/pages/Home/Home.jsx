import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './Home.module.scss'
import { Layout, CreditCard } from '../components'
import { useState } from 'react';

export default function Home({cards}) {
    // const spendingCategory = ['online', 'offline', 'movie', 'dining'];
    // const [spendingSelectedCategory, setSpendingSelectedCategory] = useState('');
    const [earnIn, setEarnIn] = useState('all');
    const [amount, setAmount] = useState(1000);
    if(!cards || !cards.length)
        return null;
    const cardsSegregration = cards.reduce((acc, curVal) => {
      if (acc[curVal.rewardType]) {
        acc[curVal.rewardType].push(curVal)
      }
      else {
        acc[curVal.rewardType] = [curVal]
      }
      return acc
    }, {})
    
    const handleAmountChange = ({ target: { value } }) => setAmount(value * 1)
    // const handleSpendingChange = ({ target: { value } }) => setSpendingSelectedCategory(value);
    const earnInRadios = [
      { name: 'All', value: 'all' },
      { name: 'Rewards Points', value: 'reward points | airmiles | fuel points' },
      { name: 'Cashback', value: 'cashback' },
    ];
    const validCards = earnIn === 'all'
      ? Object.keys(cardsSegregration)
      : Object.keys(cardsSegregration)
        .filter(x => earnIn.indexOf(x.toLocaleLowerCase()) > -1);
  
    return (
      <Layout>
        <div className='card-list'>
          {validCards.map(category => {
            return cardsSegregration[category].map((card, index) => {
                return (<CreditCard key={index} {...card} amount={amount} />)
            })
          })}
        </div>
      </Layout> 
    )
  }