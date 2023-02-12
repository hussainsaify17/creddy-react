
import React, { useState } from 'react';
// import { OverlayTrigger, Popover } from 'react-bootstrap';
import { capitalizeFirstLetter } from 'utils/helper';
// import Badge from 'react-bootstrap/Badge';
import Badge from '@mui/material/Badge';
import styles from './Usps.module.scss';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function CashbackUSP({ usps, amount, bestsuitedfor }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    if (!usps || !bestsuitedfor)
        return null;
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
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                className={styles.uspButton}
            >
                Cashback
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>
                    <div>
                        <h3>Cashback Value</h3>
                        {Object.keys(usps).map((uniqueMerchant, idx) => {
                            return <div key={uniqueMerchant}>
                                <span>
                                    {`${idx + 1}. ${capitalizeFirstLetter(uniqueMerchant)}`}
                                </span>
                                &nbsp;-&nbsp;
                                <span>
                                    {`${getCalculatedCashback(uniqueMerchant) || getPercentValue(uniqueMerchant)}`}
                                </span>
                                &nbsp;&nbsp;
                            </div>
                        })}
                        {getPills().map((bsf, index) => <Badge key={index}> {bsf} </Badge>)}
                    </div>
                </Typography>
            </Popover>
        </div>
    );
    // return (
    //     <OverlayTrigger
    //         trigger={['focus', 'hover']}
    //         placement="top"
    //         overlay={
    //             <Popover id="popover-basic">
    //                 <Popover.Header as="h3">Cashback Value</Popover.Header>
    //                 <Popover.Body>
    //                     {Object.keys(usps).map((uniqueMerchant, idx) => {
    //                         return <div key={uniqueMerchant}>
    //                             <span>
    //                                 {`${idx + 1}. ${capitalizeFirstLetter(uniqueMerchant)}`}
    //                             </span>
    //                             &nbsp;-&nbsp;
    //                             <span>
    //                                 {`${getCalculatedCashback(uniqueMerchant) || getPercentValue(uniqueMerchant)}`}
    //                             </span>
    //                             &nbsp;&nbsp;
    //                         </div>
    //                     })}
    //                     {getPills().map((bsf, index) => <Badge key={index} pill bg="primary" className='p-2'> {bsf} </Badge>)}
    //                 </  Popover.Body>
    //             </Popover>
    //         }>
    //         <button type="button" className={`btn btn-secondary ${styles.uspButton}`}>
    //             Cashback
    //         </button>
    //     </OverlayTrigger>
    // )
}

