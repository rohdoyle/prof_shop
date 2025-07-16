const plansUSD = {
  "3m": 11.99 * 1,
  "6m": 15.99 * 1,
  "12m": 28.99 * 1
};

const feeToman = 200_000;

fetch('https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeS5fqAGmH5ciOhSfNvX1T2Ukkoobz')
  .then(res => res.json())
  .then(data => {
    if(data.status === "success" && data.data && data.data.USDT && data.data.USDT.price){
      let rate = Number(data.data.USDT.price);
      updatePrices(rate);
    } else {
      throw new Error('داده نرخ دلار نامعتبر است');
    }
  })
  .catch(() => {
    const defaultRate = 88000;
    updatePrices(defaultRate);
  });

function updatePrices(rate) {
  document.getElementById("price-3m").textContent = formatPrice(plansUSD["3m"] * rate + feeToman);
  document.getElementById("price-6m").textContent = formatPrice(plansUSD["6m"] * rate + feeToman);
  document.getElementById("price-12m").textContent = formatPrice(plansUSD["12m"] * rate + feeToman);
}

function formatPrice(num) {
  return num.toLocaleString('fa-IR') + " تومان";
}
