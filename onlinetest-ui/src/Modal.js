import React from 'react'

export const Modal = ({text,isShowOk,isShowCancel, fnOk, fnCancel}) => {
  return (
    <div>
        <div className='mask'></div>
        <div>
            <h3>{text}</h3>
            <p className='text-end'>
                {isShowOk && <button onClick={fnOk} className='btn btn-primary'>Ok</button>}
                {isShowCancel && <button onClick={fnCancel} className='btn btn-primary ms-3'>Cancel</button>}
            </p>
        </div>
    </div>
  )
}
