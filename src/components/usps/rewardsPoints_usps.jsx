import React from 'react'

export default function RewardPointsUSP({ usps, amount }) {
    const { singleRPValue, ...restUSPS } = usps;
    const getCalculatedRewardPoints = _uniExp => {
        const totalRewadPoints = Math.floor((amount / singleRPValue) * restUSPS[_uniExp])
        return `${totalRewadPoints} points`
    }
    return (
        <select
            className="form-control"
            id="uspSelect">
            {Object.keys(restUSPS).map(uniqueExperience => {
                return <option value={uniqueExperience} key={Math.random() * new Date().getTime()}>
                    <span>{`${uniqueExperience}`}</span>
                    &nbsp;-&nbsp;
                    <span>
                        {getCalculatedRewardPoints(uniqueExperience)}
                    </span>
                    &nbsp;&nbsp;
                </option>
            })}
        </select>

        // <div> {Object.keys(restUSPS).map(uniqueExperience => {
        //     return <div key={Math.random() * new Date().getTime()}>
        //         <span>{`${uniqueExperience}`}</span>
        //         &nbsp;-&nbsp;
        //         <span>
        //             {getCalculatedRewardPoints(uniqueExperience)}
        //         </span>
        //         &nbsp;&nbsp;
        //     </div>
        // })}
        // </div>
    )
}
