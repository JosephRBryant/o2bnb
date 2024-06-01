let hasBookingConflict = (startDate, endDate, bookingStartDate, bookingEndDate) => {
  // if the start and end date both overlap a booking
  let conflictType;

  if ((startDate >= bookingStartDate && startDate <= bookingEndDate) &&
      (endDate <= bookingEndDate && endDate >= bookingStartDate)) {
    conflictType = "start end conflict"
  } else if (startDate >= bookingStartDate && startDate <= bookingEndDate) {
    conflictType = "start conflict"
  } else if (endDate >= bookingStartDate && endDate <= bookingEndDate) {
    conflictType = "end conflict"
  }
  return conflictType;
}

module.exports = {
  hasBookingConflict
}
