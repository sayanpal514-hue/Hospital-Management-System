import React, { useState } from 'react';

interface CartItem { name: string; batch: string; expiry: string; qty: number; price: number; }

const prescriptionItems: CartItem[] = [
  { name: 'Metoprolol Tartrate 25mg', batch: 'MT-902', expiry: '12/2026', qty: 60, price: 0.40 },
  { name: 'Atorvastatin 10mg', batch: 'AT-003', expiry: '03/2027', qty: 30, price: 5.00 },
  { name: 'Omeprazole 20mg', batch: 'OM-004', expiry: '09/2026', qty: 30, price: 3.50 },
];

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);

export const PharmacyPOS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState({ show: false, message: '', icon: '' });
  const [payModal, setPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState('Cash');

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast({ show: false, message: '', icon: '' }), 3000);
  };

  const addAllToCart = () => {
    setCart(prescriptionItems);
    showToast('All 3 medicines loaded to dispensing cart', 'add_shopping_cart');
  };

  const removeFromCart = (idx: number) => setCart(prev => prev.filter((_, i) => i !== idx));

  const updateQty = (idx: number, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map((item, i) => i === idx ? { ...item, qty } : item));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const gst = subtotal * 0.05; // 5% GST on medicines
  const total = subtotal + gst;
  const discount = subtotal > 500 ? subtotal * 0.05 : 0;
  const grand = total - discount;

  const handleDispense = () => {
    setPayModal(false);
    setCart([]);
    showToast('✅ Order #DISP-7492 dispensed! Invoice generated & inventory updated.', 'task_alt');
  };

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface">Pharmacy POS</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Prescription dispensing & billing counter</p>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-space-xs bg-secondary-container text-on-secondary-container px-space-md py-space-sm rounded-full font-caption text-caption font-semibold">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
            Dispensing Counter 04 · Ready
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-space-xl">
        {/* LEFT: Prescription & Search */}
        <div className="flex-1 flex flex-col gap-space-lg">
          {/* Search Bar */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">medical_services</span>
              Prescription Lookup
            </h2>
            <div className="flex gap-space-sm">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input type="text" defaultValue="AH-84920" className="w-full h-10 pl-10 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Search UHID, Rx#, Patient name..." />
              </div>
              <button onClick={() => showToast('Barcode scanner active. Scan now...', 'barcode_scanner')} className="h-10 px-space-lg bg-surface-container text-on-surface rounded-lg font-headline-sm text-body-sm hover:bg-surface-container-high transition-colors flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px]">barcode_scanner</span> Scan
              </button>
            </div>
          </div>

          {/* Patient Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high overflow-hidden">
            {/* Patient Header */}
            <div className="bg-surface-container-low px-space-lg py-space-md flex items-center justify-between flex-wrap gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">EV</div>
                <div>
                  <div className="flex items-center gap-space-sm flex-wrap">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Eleanor Vance</span>
                    <span className="font-clinical-code text-clinical-code text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">UHID: AH-84920</span>
                    <span className="font-caption text-caption text-secondary font-semibold bg-secondary-container/40 px-2 py-0.5 rounded-full">O+</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">42 y/o Female · OPD Cardiology · Dr. Sarah Jenkins</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-caption text-caption text-on-surface-variant">Prescription #</p>
                <p className="font-clinical-value-md text-clinical-value-md text-primary font-bold">RX-2024-8891</p>
                <p className="font-caption text-caption text-outline">Today, 09:45 AM</p>
              </div>
            </div>

            {/* Allergy Alert */}
            <div className="mx-space-lg mt-space-md bg-error-container/40 rounded-lg px-space-md py-space-sm flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-error text-[18px]">warning</span>
              <span className="font-headline-sm text-body-sm text-on-error-container font-bold">Allergy Alert:</span>
              <span className="font-body-sm text-body-sm text-on-error-container">PENICILLINS & SULFONAMIDES</span>
            </div>

            {/* Prescribed Items Table */}
            <div className="p-space-lg">
              <div className="flex items-center justify-between mb-space-md">
                <span className="font-headline-sm text-body-sm text-on-surface font-semibold uppercase tracking-wider">Prescribed Medications</span>
                <span className="font-caption text-caption text-on-surface-variant">Real-time inventory validation</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                      <th className="px-3 py-2.5 rounded-l-lg">Medicine & Instructions</th>
                      <th className="px-3 py-2.5">Batch / Expiry</th>
                      <th className="px-3 py-2.5 text-right">Stock</th>
                      <th className="px-3 py-2.5 text-right">Qty</th>
                      <th className="px-3 py-2.5 text-right">Rate</th>
                      <th className="px-3 py-2.5 text-right rounded-r-lg">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    {prescriptionItems.map((item, i) => (
                      <tr key={i} className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="px-3 py-3">
                          <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{item.name}</p>
                          <p className="font-clinical-code text-clinical-code text-primary">
                            {i === 0 ? '1 tab bid pc (Twice daily after meals)' : i === 1 ? '1 tab od hs (Once daily at bedtime)' : '1 cap od ac (Once daily before breakfast)'}
                          </p>
                        </td>
                        <td className="px-3 py-3">
                          <p className="font-clinical-code text-clinical-code text-on-surface">{item.batch}</p>
                          <p className="font-caption text-caption text-on-surface-variant">Exp: {item.expiry}</p>
                        </td>
                        <td className="px-3 py-3 text-right font-clinical-value-md text-body-sm text-secondary font-semibold">{420 - i * 80} tabs</td>
                        <td className="px-3 py-3 text-right font-clinical-value-md text-body-sm text-on-surface font-bold">{item.qty}</td>
                        <td className="px-3 py-3 text-right font-clinical-code text-clinical-code text-on-surface-variant">{formatINR(item.price)}</td>
                        <td className="px-3 py-3 text-right font-clinical-value-md text-body-sm text-on-surface font-bold">{formatINR(item.price * item.qty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-space-md">
                <button onClick={addAllToCart} className="flex items-center gap-space-xs px-space-lg py-space-md bg-primary text-white rounded-lg font-headline-sm text-body-sm hover:bg-primary-container transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Load All to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Cart & Billing */}
        <div className="w-full lg:w-96 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high overflow-hidden flex flex-col">
            {/* Cart Header */}
            <div className="bg-surface-container-low px-space-lg py-space-md flex items-center justify-between">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">shopping_bag</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Dispensing Cart</span>
                </div>
                <span className="font-clinical-code text-clinical-code text-on-surface-variant">#DISP-7492 · Eleanor Vance</span>
              </div>
              <span className={`font-caption text-caption px-2 py-0.5 rounded-full font-semibold ${cart.length > 0 ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                {cart.length} items
              </span>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <div className="p-space-xl flex flex-col items-center gap-space-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[40px] text-surface-container-high">shopping_cart</span>
                <p className="font-body-sm text-body-sm text-center">Cart is empty. Load prescription items above.</p>
              </div>
            ) : (
              <div className="divide-y divide-surface-container-low">
                {cart.map((item, i) => (
                  <div key={i} className="px-space-lg py-space-md flex flex-col gap-space-xs">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-headline-sm text-body-sm text-on-surface font-semibold leading-tight">{item.name}</p>
                        <p className="font-caption text-caption text-on-surface-variant">{item.batch} · Exp {item.expiry}</p>
                      </div>
                      <button onClick={() => removeFromCart(i)} className="p-1 rounded text-on-surface-variant hover:text-error hover:bg-error-container transition-colors">
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(i, item.qty - 1)} className="w-7 h-7 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center font-bold">−</button>
                        <span className="font-clinical-value-md text-body-sm w-8 text-center font-bold text-on-surface">{item.qty}</span>
                        <button onClick={() => updateQty(i, item.qty + 1)} className="w-7 h-7 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center font-bold">+</button>
                      </div>
                      <div className="text-right">
                        <p className="font-caption text-caption text-on-surface-variant">{formatINR(item.price)} × {item.qty}</p>
                        <p className="font-clinical-value-md text-body-sm text-on-surface font-bold">{formatINR(item.price * item.qty)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bill Summary */}
            {cart.length > 0 && (
              <div className="bg-surface-container-low px-space-lg py-space-md flex flex-col gap-2 border-t border-surface-container-high">
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>Subtotal</span><span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span>GST (5%)</span><span>{formatINR(gst)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between font-body-sm text-body-sm text-secondary">
                    <span>Discount (5%)</span><span>−{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-headline-sm text-headline-sm text-on-surface font-bold pt-1 border-t border-outline-variant">
                  <span>Grand Total</span>
                  <span className="text-primary text-lg">{formatINR(grand)}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-space-md flex flex-col gap-space-sm">
              <div className="flex gap-space-sm">
                <button onClick={() => showToast('Label printed for DISP-7492', 'print')} className="flex-1 h-10 bg-surface-container text-on-surface rounded-lg font-headline-sm text-body-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">print</span> Label
                </button>
                <button onClick={() => showToast('Invoice queued for printing', 'receipt_long')} className="flex-1 h-10 bg-surface-container text-on-surface rounded-lg font-headline-sm text-body-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span> Invoice
                </button>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={() => setPayModal(true)}
                className="w-full h-12 bg-primary text-white rounded-xl font-headline-sm text-body-sm font-bold hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-space-sm shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                Dispense & Collect {cart.length > 0 ? formatINR(grand) : ''}
              </button>
            </div>
          </div>

          {/* Quick Medicine Search */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-space-lg flex flex-col gap-space-md">
            <h3 className="font-headline-sm text-body-sm text-on-surface font-semibold flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[18px]">medication</span> Quick Add Medicine
            </h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
              <input type="text" placeholder="Search formulary..." className="w-full h-9 pl-9 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="flex flex-col gap-1">
              {[{ name: 'Paracetamol 500mg', stock: 5000, price: 2.50 }, { name: 'Amoxicillin 250mg', stock: 1200, price: 8.00 }, { name: 'Cetirizine 10mg', stock: 800, price: 1.50 }].map(m => (
                <button key={m.name} onClick={() => { setCart(prev => { const exists = prev.find(p => p.name === m.name); if (exists) return prev.map(p => p.name === m.name ? { ...p, qty: p.qty + 1 } : p); return [...prev, { name: m.name, batch: 'GEN-001', expiry: '12/2027', qty: 1, price: m.price }]; }); showToast(`${m.name} added to cart`, 'add_shopping_cart'); }} className="flex items-center justify-between px-space-sm py-space-xs rounded-lg hover:bg-surface-container-low transition-colors">
                  <div className="text-left">
                    <p className="font-headline-sm text-body-sm text-on-surface font-semibold">{m.name}</p>
                    <p className="font-caption text-caption text-on-surface-variant">{m.stock.toLocaleString('en-IN')} in stock</p>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-clinical-value-md text-body-sm text-primary font-bold">{formatINR(m.price)}</span>
                    <span className="material-symbols-outlined text-primary text-[18px]">add_circle</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {payModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="border-b border-surface-container-high px-space-xl py-space-lg flex items-center justify-between">
              <h2 className="font-headline-lg text-headline-sm text-on-surface font-bold">Collect Payment</h2>
              <button onClick={() => setPayModal(false)} className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-space-xl flex flex-col gap-space-md">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-space-lg text-center">
                <p className="font-caption text-caption text-on-surface-variant">Amount to Collect</p>
                <p className="font-clinical-value-lg text-[32px] text-primary font-bold">{formatINR(grand)}</p>
                <p className="font-caption text-caption text-on-surface-variant mt-1">Incl. 5% GST · {cart.length} medicines</p>
              </div>
              <div>
                <label className="font-headline-sm text-body-sm font-semibold mb-2 block">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Cash', 'UPI', 'Card'].map(m => (
                    <button key={m} onClick={() => setPayMethod(m)} className={`py-space-md rounded-xl font-headline-sm text-body-sm transition-colors flex flex-col items-center gap-1 ${payMethod === m ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface border border-outline-variant hover:bg-surface-container'}`}>
                      <span className="material-symbols-outlined text-[20px]">{m === 'Cash' ? 'payments' : m === 'UPI' ? 'qr_code_scanner' : 'credit_card'}</span>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              {payMethod === 'Cash' && (
                <div>
                  <label className="font-headline-sm text-body-sm font-semibold mb-1 block">Cash Tendered (₹)</label>
                  <input type="number" defaultValue={Math.ceil(grand)} className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              )}
              {payMethod === 'UPI' && (
                <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col items-center gap-space-sm">
                  <div className="w-24 h-24 bg-on-surface rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[48px]">qr_code</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-center">Scan QR to pay {formatINR(grand)}</p>
                </div>
              )}
            </div>
            <div className="border-t border-surface-container-high px-space-xl py-space-lg">
              <button onClick={handleDispense} className="w-full h-12 bg-secondary text-white rounded-xl font-headline-sm text-body-sm font-bold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-space-sm shadow-md">
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
                Confirm Dispensing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`fixed bottom-6 right-6 bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-xl z-[100] flex items-center gap-space-sm transition-all duration-300 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
        <span className="material-symbols-outlined text-secondary-container text-[20px]">{toast.icon}</span>
        <span className="font-body-md text-body-sm">{toast.message}</span>
      </div>
    </div>
  );
};
