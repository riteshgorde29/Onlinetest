import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const Question = ({opt1,opt2,opt3,opt4,_id,que,type,sno,fnChange}) => {
 const optValues=['A','B','C','D']
  return (
      <Card className='mb-3'>
        <CardContent>
            <p>
                <b>{sno}. {que}</b>
            </p>
            {
                [opt1,opt2,opt3,opt4].map((v,i)=>{
                    return <div className='mb-2' key={i}>{type=='s' ? <input value={optValues[i]} onChange={fnChange} type='radio' name={_id} /> : <input name={_id} value={optValues[i]} type='checkbox' onChange={fnChange} />}<span className='ms-1'>{v}</span></div>
                })
            }
        </CardContent>
      </Card>
  )
}
