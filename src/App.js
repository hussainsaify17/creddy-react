import { useState } from 'react';
import { ButtonGroup, Form, InputGroup, ToggleButton } from 'react-bootstrap';
import './App.css';
import allCards from './IndexCards.json'
import AllCards from './import all cards';
import CreditCard from './components/creditcard/creditCard';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  // const spendingCategory = ['online', 'offline', 'movie', 'dining'];
  const [amount, setAmount] = useState(1000);
  const cardsSegregration = allCards.reduce((acc, curVal) => {
    if (acc[curVal.rewardType]) {
      acc[curVal.rewardType].push(curVal)
    }
    else {
      acc[curVal.rewardType] = [curVal]
    }
    return acc
  }, {})
  // const [spendingSelectedCategory, setSpendingSelectedCategory] = useState('');
  const [earnIn, setEarnIn] = useState('all');
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

  // return (<AllCards />)

  return (
    <div className="App container-fluid">
      <header className="App-header">
        Creddy - Your credit card buddy.
      </header>
      <div className='app-body'>
        <InputGroup className="mb-3">
          <Form.Control
            defaultValue={amount}
            className='amount-field'
            type='number'
            placeholder='Enter the amount you will be spending ?'
            onChange={handleAmountChange}
          />
          {/* <Form.Select onChange={handleSpendingChange}>
          <option value={''}>select</option>
          {spendingCategory.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </Form.Select> */}
          {/* <ButtonGroup>
            {earnInRadios.map((_type, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant='outline-primary'
                name="radio"
                value={_type.value}
                checked={earnIn === _type.value}
                onChange={(e) => setEarnIn(e.currentTarget.value)}
              >
                {_type.name}
              </ToggleButton>
            ))}
          </ButtonGroup> */}
        </InputGroup>
      </div>
      <div className='row col-md-12 card-list'>
        {validCards.map(category => {
          return cardsSegregration[category].map(card => {
            return (<CreditCard {...card} amount={amount} />)
          })
        })}
      </div>
      
    </div>
  );
}

export default App;
