import React from 'react';
import PopoverMenu from './PopoverMenu';

interface StopDetailHeadingProps {
  name: string;
  stopId: number;
  onStopAmenitiesClick: () => void;
}  

function StopDetailHeading({ name, stopId, onStopAmenitiesClick }: StopDetailHeadingProps) {
  
  const menuItems = [
    {
      name: 'Stop Schedule',
      onSelect:  window.open('https://trimet.org/ride/stop_schedule.html?_LOCALE_=en&stop_id=${stopId}', '_blank'),
      href: 'https://trimet.org/ride/stop_schedule.html?_LOCALE_=en&stop_id=${stopId}',
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
