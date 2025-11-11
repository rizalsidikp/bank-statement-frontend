export function formatRupiah(amount: number): string {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return formatter.format(amount);
}

export function formatTimestamp(ts: number): string {
  if (ts.toString().length === 10) ts = ts * 1000;

  const date = new Date(ts);
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function snakeToCamel<T>(input: T): T {
  if (Array.isArray(input)) {
    return input.map(snakeToCamel) as T;
  } else if (input !== null && typeof input === 'object' && input.constructor === Object) {
    const newObj: Record<string, T> = {};
    Object.keys(input).forEach((key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      newObj[camelKey] = snakeToCamel((input as Record<string, T>)[key]);
    });
    return newObj as T;
  }
  return input;
}
