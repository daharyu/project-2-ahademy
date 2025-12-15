export const formatRupiah = (amount: number | string) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(Number(amount))
    .replace('Rp', 'Rp'); // already includes "Rp", but you can customize
};

export const formatDateID = (isoString: string): string => {
  const date = new Date(isoString);

  return (
    date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) +
    ', ' +
    date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  );
};
