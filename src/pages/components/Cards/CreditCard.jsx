import React from 'react';
import styles from './Creditcard.module.scss';
import {CashbackUSP, RewardPointsUSP} from './Usps';
import Image from 'next/image';

const CreditCard = ({cardTitle, usp, amount, bestSuitedFor, imageLink, rewardType}) => {
    const {data: {attributes: {url: imageUrl}}} = imageLink || {data: {attributes: {url: ''}}};
    return (
        <div className={styles.cardContainer}>
            <h5 className="card-title">{cardTitle}</h5>
            {/* <p className="card-text text-muted">Best suited for: {bestSuitedFor}</p> */}
            <Image src={imageUrl} height={200} width={200} className={styles.cardImgTop} alt="credit card" />
            {usp && (<div>
                {rewardType.toLocaleLowerCase().indexOf('cashback') > -1
                    ? <CashbackUSP usps={usp} amount={amount} bestsuitedfor={bestSuitedFor} />
                    : <RewardPointsUSP usps={usp} amount={amount} />}
            </div>)}
            <div className={styles.cardBody}>
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