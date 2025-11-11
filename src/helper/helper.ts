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

export function snakeToCamel(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  } else if (obj !== null && obj.constructor === Object) {
    const newObj: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      newObj[camelKey] = snakeToCamel(obj[key]);
    });
    return newObj;
  }
  return obj;
}
