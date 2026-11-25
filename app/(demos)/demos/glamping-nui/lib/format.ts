const nf = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
export const vnd = (n: number) => nf.format(n);
