interface Transaction {
  user: string;
  action: "Short Yield" | "Long Yield";
  impliedAPY: string;
  syAmount: string;
  ptAmount: string;
  time: string;
}

export default Transaction;
