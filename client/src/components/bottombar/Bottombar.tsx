import './bottombar.css';

function BottomBar() {
  var today = new Date();
  return (
    <footer className="text-white text-center bg-gray-900 border-gray-200">
      &copy; Group 19 {today.getFullYear()}
    </footer>
  );
}

export { BottomBar };
