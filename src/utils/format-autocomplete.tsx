export const formattedValue = (
  originalValue: { value: any; label: string }[] | string | number
) => {
  const formattedValue = Array.isArray(originalValue)
    ? originalValue
    : typeof originalValue === 'string'
      ? originalValue.split(',').map((val) => ({ value: val.trim(), label: val.trim() }))
      : [];
  return formattedValue;
};
