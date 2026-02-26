export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-bold text-blue-600 mb-4">CareFlow</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Revolutionizing healthcare management with intuitive design and powerful automation.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>Features</li>
            <li>Integrations</li>
            <li>Security</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
        © 2026 CareFlow Inc. All rights reserved.
      </div>
    </footer>
  );
}