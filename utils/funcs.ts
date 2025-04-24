import { FixedPoint64 } from "@kamo-finance/ts-sdk";

export const compressSuiAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatTime = (time: number) => {
  const d = Math.floor(time / (1000 * 60 * 60 * 24));
  const h = Math.floor(time / (1000 * 60 * 60));
  const m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((time % (1000 * 60)) / 1000);

  let res = "";

  if (d > 0) {
    res = res + `${d}d`;
  }
  if (h > 0) {
    res = res + `${h}h`;
  }
  if (m > 0) {
    res = res + `${m}m`;
  }
  if (s > 0) {
    res = res + `${s}s`;
  }

  return res;
};

export const getImpliedRate = (value: bigint): string => {
  const lnImpliedRate = new FixedPoint64(value);
  const impliedRate = FixedPoint64.Exp(lnImpliedRate).decimalValue().toString();

  return impliedRate;
};

export const formatNumberWithCommas = (number: number | string): string => {
  return parseFloat(number.toString()).toLocaleString("en-US", {});
};
