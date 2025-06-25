export default function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content border-2 border-base-300 rounded-t-2xl mt-16">
      <aside>
        <p>© {new Date().getFullYear()} Pitch Arena. All rights reserved.</p>
      </aside>
    </footer>
  );
} 