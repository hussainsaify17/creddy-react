import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './creditcard.css'
import CashbackUSP from '../usps/cashback_usps';
import RewardPointsUSP from '../usps/rewardsPoints_usps';

const CreditCard = (props) => {
    return (
        <div className="col-md-3 card text-center p-3 m-2">
            <h5 className="card-title">{props.cardTitle}</h5>
            {/* <p className="card-text text-muted">Best suited for: {props.bestSuitedFor}</p> */}
            <img src={props.imageLink} className="card-img-top m-auto" alt="credit card" />
            {props.usp && (<div>
                {props.rewardType.toLocaleLowerCase().indexOf('cashback') > -1
                    ? <CashbackUSP usps={props.usp} amount={props.amount} bestsuitedfor={props.bestSuitedFor} />
                    : <RewardPointsUSP usps={props.usp} amount={props.amount} />}
            </div>)}
            <div className="card-body">
                {/* <ul className="list-group list-group-flush">
                    {props.andThereIsMore.map((item) => (
                        <li key={Math.random() * 23} className="list-group-item">{item}</li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
};

export default CreditCard;