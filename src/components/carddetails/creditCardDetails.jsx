import React from 'react';

export default function CreditCardDetailed({ data }) {
    const {
        openerSection,
        imageLink,
        cardTitle,
        bestSuitedFor,
        joiningFee,
        rewardType,
        andThereIsMore,
        gifts,
        rewardsBenefits,
        keepAnEyeOn,
    } = data;

    return (
        <div className="credit-card">
            <div className="header">
                <img src={imageLink} alt={cardTitle} />
                <h1>{cardTitle}</h1>
                <p>Best suited for: {bestSuitedFor}</p>
            </div>
            <div className="body">
                {openerSection.map((section) => (
                    <p>{section}</p>
                ))}
                <h2>And there's more:</h2>
                <ul>
                    {andThereIsMore.map((benefit) => (
                        <li>{benefit}</li>
                    ))}
                </ul>
                {gifts.welcomeGifts.length > 0 && (
                    <>
                        <h2>Welcome gifts:</h2>
                        <ul>
                            {gifts.welcomeGifts.map((gift) => (
                                <li>{gift}</li>
                            ))}
                        </ul>
                    </>
                )}
                {gifts.milestoneGifts.length > 0 && (
                    <>
                        <h2>Milestone gifts:</h2>
                        <ul>
                            {gifts.milestoneGifts.map((gift) => (
                                <li>{gift}</li>
                            ))}
                        </ul>
                    </>
                )}
                {gifts.rewardsPoints.length > 0 && (
                    <>
                        <h2>Rewards points:</h2>
                        <ul>
                            {gifts.rewardsPoints.map((point) => (
                                <li>{point}</li>
                            ))}
                        </ul>
                    </>
                )}
                <h2>Rewards benefits:</h2>
                <ul>
                    {Object.entries(rewardsBenefits).map(([benefit, details]) => (
                        <li>
                            <h3>{benefit}:</h3>
                            <ul>
                                {details.map((detail) => (
                                    <li>{detail}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <h2>Keep an eye on:</h2>
                <ul>
                    {Object.entries(keepAnEyeOn).map(([feature, details]) => (
                        <li>
                            <h3>{feature}:</h3>
                            <ul>
                                {details.map((detail) => (
                                    <li>{detail}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}