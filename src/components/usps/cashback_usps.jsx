
import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../utils/helper';
import Badge from 'react-bootstrap/Badge';
import './usps.css'

export default function CashbackUSP({ usps, amount, bestsuitedfor }) {
    const getPercentValue = (uniqueMerchant) => {
        return `${(usps[uniqueMerchant] * 100).toFixed(2)}%`
    }
    const getCalculatedCashback = (uniqueMerchant) => {
        const val = amount * usps[uniqueMerchant];
        return val ? `₹ ${val.toFixed(2)} (${getPercentValue(uniqueMerchant)})` : null
    }
    const getPills = () => {
        return bestsuitedfor.split('|')
    }
    return (
        <OverlayTrigger
        trigger={['focus','hover']}
        placement="top"
        overlay={
          <Popover id="popover-basic">
            <Popover.Header as="h3">Cashback Value</Popover.Header>
                <Popover.Body>
                    {Object.keys(usps).map((uniqueMerchant, idx) => {
                        return <div key={uniqueMerchant}>
                            <span>
                                {`${idx+1}. ${capitalizeFirstLetter(uniqueMerchant)}`}
                            </span>
                            &nbsp;-&nbsp;
                            <span>
                                {`${getCalculatedCashback(uniqueMerchant) || getPercentValue(uniqueMerchant)}`}
                            </span>
                            &nbsp;&nbsp;
                        </div>
                    })}
                    {getPills().map(bsf => <Badge pill bg="primary" className='p-2'> {bsf} </Badge>)}
            </  Popover.Body>
          </Popover>
        }>
        <button type="button" className="btn btn-secondary usp-button">
          Cashback
        </button>
      </OverlayTrigger>
    )
}

