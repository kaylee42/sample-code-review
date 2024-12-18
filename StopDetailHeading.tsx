import React from 'react';

interface StopDetailHeadingProps {
  name: string;
}  

function StopDetailHeading({ name }: StopDetailHeadingProps) {
  return <h2>{name}</h2>
}
