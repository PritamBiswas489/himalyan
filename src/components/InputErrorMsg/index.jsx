import React from 'react';

function InputErrorMsg(props) {
    return (
        <>
            <span
                className='input-error'
                style={{
                    color: '#cb0202',
                    fontSize: '13px',
                    marginTop: '2px',
                    lineHeight: 1,
                }}
            >
                {props.error}
            </span>
        </>
    );
}

export default InputErrorMsg;
