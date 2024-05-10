import React from 'react'
import { useParams } from 'react-router-dom'

const MechanicListing = ({onValueChange}) => {
  const {id} = useParams();
  useEffect(() => {
    onValueChange(id);
  }, [id]);  
  return (
    <div>MechanicListing</div>
  )
}

export default MechanicListing