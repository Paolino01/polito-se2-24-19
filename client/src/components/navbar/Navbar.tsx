import "./navbar.css"
import logo from "../../assets/Group 19 logo.png";

function NavB() {
    return (
        <nav className="border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
                <img src={logo} className="h-8 pr-2" alt="Group 19 Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Group 19</span>
            </div>
        </nav>
    );
}

export { NavB }