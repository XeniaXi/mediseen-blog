export default function CTABanner() {
  return (
    <div className="bg-gradient-to-r from-green-800 to-green-900 text-white rounded-2xl p-8 my-12 text-center shadow-xl">
      <h3 className="text-2xl font-bold mb-3">Ready to Digitise Your Hospital?</h3>
      <p className="text-green-200 mb-6 max-w-xl mx-auto">
        MediSeen HMS works even without internet. Manage patients, billing, pharmacy, lab orders and more — all in one system built for Nigerian hospitals.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a href="https://app.mediseenhms.com/register"
           className="bg-yellow-400 text-green-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition">
          Start Free 14-Day Trial
        </a>
        <a href="https://wa.me/2348165160797"
           className="border border-green-400 text-green-200 px-6 py-3 rounded-lg hover:bg-green-800 transition">
          WhatsApp Demo
        </a>
      </div>
    </div>
  );
}
