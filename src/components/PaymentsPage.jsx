import { useState, useRef, useEffect } from 'react'
import { animate } from 'animejs'

const PaymentsPage = () => {
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      date: '2024-02-15',
      amount: 1999,
      status: 'Paid',
      method: 'UPI',
      invoice: 'INV-2024-001',
    },
    {
      id: 2,
      date: '2024-01-15',
      amount: 1999,
      status: 'Paid',
      method: 'Credit Card',
      invoice: 'INV-2024-002',
    },
    {
      id: 3,
      date: '2023-12-15',
      amount: 1999,
      status: 'Paid',
      method: 'Bank Transfer',
      invoice: 'INV-2024-003',
    },
  ])

  const [upcomingPayment, setUpcomingPayment] = useState({
    date: '2024-03-15',
    amount: 1999,
    status: 'Pending',
  })

  const pageRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (pageRef.current) {
      animate(pageRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
      })
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        animate(card, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          delay: 100 + index * 100,
          easing: 'easeOutExpo',
        })
      }
    })
  }, [])

  const downloadInvoice = (invoiceId) => {
    const invoice = paymentHistory.find((p) => p.invoice === invoiceId)
    if (invoice) {
      const invoiceContent = `
ELITEFIT GYM - PAYMENT INVOICE
===============================

Invoice Number: ${invoice.invoice}
Date: ${new Date(invoice.date).toLocaleDateString()}
Amount: ₹${invoice.amount.toLocaleString()}
Payment Method: ${invoice.method}
Status: ${invoice.status}

Thank you for your payment!
      `
      const blob = new Blob([invoiceContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${invoiceId}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div ref={pageRef} className="opacity-0">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Payments</h1>
        <p className="text-gray-400">View your payment history and manage subscriptions</p>
      </div>

      {/* Upcoming Payment Card */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Upcoming Payment</h2>
          <span className="px-4 py-2 bg-accent-red/20 text-accent-red rounded-full text-sm font-semibold border border-accent-red/30">
            Pending
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Amount</p>
            <p className="text-3xl font-black text-accent-red">
              ₹{upcomingPayment.amount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Due Date</p>
            <p className="text-xl font-bold">
              {new Date(upcomingPayment.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-end">
            <button className="w-full px-6 py-3 bg-accent-green text-dark-bg font-bold rounded-lg hover:bg-accent-green/90 transition-colors glow-green">
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        <div className="space-y-4">
          {paymentHistory.map((payment, index) => (
            <div
              key={payment.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass rounded-xl p-6 opacity-0"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-bold">{payment.invoice}</h3>
                    <span className="px-3 py-1 bg-accent-green/20 text-accent-green rounded-full text-xs font-semibold border border-accent-green/30">
                      {payment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Date</p>
                      <p className="font-semibold">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Amount</p>
                      <p className="font-semibold text-accent-green">
                        ₹{payment.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Method</p>
                      <p className="font-semibold">{payment.method}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Invoice</p>
                      <p className="font-semibold">{payment.invoice}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => downloadInvoice(payment.invoice)}
                  className="px-6 py-2 border-2 border-accent-green text-accent-green rounded-lg font-semibold hover:bg-accent-green/10 transition-colors"
                >
                  Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {['UPI', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Wallet'].map((method) => (
            <div
              key={method}
              className="p-4 bg-dark-bg rounded-lg border-2 border-dark-border hover:border-accent-green/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{method}</span>
                {method === 'UPI' && (
                  <span className="px-2 py-1 bg-accent-green/20 text-accent-green rounded text-xs font-semibold">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage
