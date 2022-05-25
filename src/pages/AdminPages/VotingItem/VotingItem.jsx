import React from 'react';
import {useParams} from 'react-router-dom';

const VotingItem = () => {
  const params = useParams();

  return ( 
    <div>
      {params.id}
    </div>
  );
}
 
export default VotingItem;