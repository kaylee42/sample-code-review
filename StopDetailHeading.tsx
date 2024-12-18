import React from 'react';
import PopoverMenu from './PopoverMenu';

interface StopDetailHeadingProps {
  name: string;
  onStopAmenitiesClick: () => void;
}  

function StopDetailHeading({ name, onStopAmenitiesClick }: StopDetailHeadingProps) {
  
  const menuItems = [
    {
      name: 'Stop Schedule',
      onSelect: navigateToSchedule,
      href: stopScheduleLink,
      key: 0
    },
    {
      name: 'Stop Amenities',
      // this opens a modal containing the stop amenities
      onSelect: onStopAmenitiesClick,
      key: 1
    }
  ];
  
  return (
    <h2>
      {name}
      <PopoverMenu menuItems={menuItems} useButtonForSecondItem />
    </h2>
  )
}
