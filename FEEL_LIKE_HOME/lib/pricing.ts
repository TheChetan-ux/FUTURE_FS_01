export function getOwnerRegistrationFee(assetType: "property" | "vehicle") {
  return assetType === "property" ? 500 : 200;
}

export function getVehicleBlockRate() {
  return 500;
}

export function getCustomerBookingFee(propertyNightlyRate: number) {
  if (propertyNightlyRate < 2000) {
    return 499;
  }

  if (propertyNightlyRate < 5000) {
    return 999;
  }

  if (propertyNightlyRate < 10000) {
    return 2499;
  }

  return 4999;
}
