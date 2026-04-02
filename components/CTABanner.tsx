export default function CTABanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-green-950 text-white rounded-2xl p-8 md:p-12 my-12 text-center shadow-2xl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-400 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10">
        <span className="inline-block bg-yellow-400/20 text-yellow-300 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          🏥 Built for Nigerian Hospitals
        </span>
        <h3 className="text-2xl md:text-3xl font-black mb-3">Ready to Digitise Your Hospital?</h3>
        <p className="text-green-200 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
          MediSeen HMS works even without internet. Manage patients, billing, pharmacy, lab orders and more — all in one system.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="https://app.mediseenhms.com/register"
             className="bg-yellow-400 text-green-900 px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg">
            Start Free 14-Day Trial
          </a>
          <a href="https://wa.me/2348165160797"
             className="border-2 border-green-400 text-green-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Demo
          </a>
        </div>
      </div>
    </div>
  );
}
