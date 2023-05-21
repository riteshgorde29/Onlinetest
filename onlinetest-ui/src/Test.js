import React, { useEffect, useState } from 'react'
import { fnSendGetReq } from './ServerCall'
import { Question } from './Question'
import Button from '@mui/material/Button';
import { Loader } from './Loader';
import { Modal } from './Modal';
export const Test = () => {
 
  const [questions,setQuestions]=useState([])
  const [isShowLoader, setIsShowLoader]=useState(false)
  const [isShowModal, setIsShowModal]=useState(false)
  const [modelProps,setModalProps]=useState({text:"",isShowOk:false, isShowCancel:false, fnOk:()=>{},fnCancel:()=>{}})
  const [keyObj,setKeyObj]=useState({})
  const [ansObj,setAnsObj]=useState({})

  useEffect(()=>{
    fnGetQuestions()
  },[])
  const fnGetQuestions=()=>{
    setIsShowLoader(true)
      fnSendGetReq('que/get-que')
      .then((res)=>{
        let _keyObj={}
        setIsShowLoader(false)
        setQuestions(res.data)
        res.data.forEach(({_id,ans})=>{
          _keyObj[_id]=ans
        })
        setKeyObj(_keyObj)
      })
      .catch(()=>{
        setIsShowLoader(false)
        setQuestions([])
      })
  }
  const fnTestEnd=()=>{
    setModalProps({text:"",isShowOk:false, isShowCancel:false, fnOk:()=>{},fnCancel:()=>{}})
    setIsShowModal(false)
    window.location.reload();
  }
  const fnTestSubmit=()=>{
    setModalProps({text:"",isShowOk:false, isShowCancel:false, fnOk:()=>{},fnCancel:()=>{}})
    setIsShowModal(false)
    let marks=0
    Object.keys(ansObj).forEach((qno)=>{
         if(keyObj[qno]==ansObj[qno]){
          marks++
         }
    })
    setModalProps({text:`You got ${marks} Marks`,isShowOk:true, fnOk:fnTestEnd})
    setIsShowModal(true)
  }

  const fnCancel=()=>{
    setModalProps({text:"",isShowOk:false, isShowCancel:false, fnOk:()=>{},fnCancel:()=>{}})
    setIsShowModal(false)
  }
  const fnSubmit=()=>{
    setModalProps({text:"R u sure...",isShowOk:true, isShowCancel:true, fnOk:fnTestSubmit,fnCancel:fnCancel})
    setIsShowModal(true)
  }

  const fnChange=(eve)=>{
    const {name,value,type,checked} =eve.target
    if(type=='checkbox'){
      let checkedItems=ansObj[name]?ansObj[name].split(""):[]
      if(checked){
        checkedItems.push(value)
      }else{
        checkedItems.splice(checkedItems.indexOf(value),1)
      }
      setAnsObj({...ansObj,[name]:checkedItems.sort().join("")})
    }else{
      setAnsObj({...ansObj,[name]:value})
    }
   
  }
  return (
    <div className='mb-5'>
      {
        questions.map((obj,ind)=>{
          return <Question key={ind}  sno={ind+1} fnChange={fnChange} {...obj}/>
        })
      }
   {questions.length > 0 && <Button onClick={fnSubmit} variant="contained">SUBMIT</Button>}
   {isShowLoader && <Loader />}
   {isShowModal && <Modal {...modelProps}  />}
    </div>
  )
}
